
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UseSecureAudioProps {
  bookId: string;
  audioPath: string;
}

interface ListeningProgress {
  current_position: number;
  duration: number | null;
}

export const useSecureAudio = ({ bookId, audioPath }: UseSecureAudioProps) => {
  const { user } = useAuth();
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<ListeningProgress | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate signed URL for secure access
  const generateSignedUrl = async (path: string): Promise<string> => {
    try {
      const { data, error } = await supabase.storage
        .from('podcasts')
        .createSignedUrl(path, 3600); // 1 hour expiry

      if (error) {
        console.error('Error generating signed URL:', error);
        throw error;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Failed to generate signed URL:', error);
      throw error;
    }
  };

  // Load user's listening progress
  const loadProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('listening_progress')
        .select('current_position, duration')
        .eq('user_id', user.id)
        .eq('book_id', bookId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading progress:', error);
        return;
      }

      if (data) {
        setProgress(data);
        setCurrentTime(data.current_position);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  // Save listening progress
  const saveProgress = async (position: number, audioDuration?: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('listening_progress')
        .upsert({
          user_id: user.id,
          book_id: bookId,
          current_position: position,
          duration: audioDuration || duration,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving progress:', error);
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  // Initialize secure audio
  const initializeAudio = async () => {
    if (!audioPath || !user) return;

    setIsLoading(true);
    try {
      const signedUrl = await generateSignedUrl(audioPath);
      setAudioUrl(signedUrl);
      await loadProgress();
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle audio time updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime;
      setCurrentTime(newTime);
      
      // Save progress every 10 seconds
      if (Math.floor(newTime) % 10 === 0) {
        saveProgress(newTime);
      }
    }
  };

  // Handle audio metadata loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      setDuration(audioDuration);
      
      // Resume from saved position
      if (progress && progress.current_position > 0) {
        audioRef.current.currentTime = progress.current_position;
        setCurrentTime(progress.current_position);
      }
    }
  };

  // Handle audio ended
  const handleEnded = () => {
    setIsPlaying(false);
    saveProgress(0); // Reset progress when finished
  };

  // Play/pause toggle
  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        saveProgress(currentTime);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Seek to specific time
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      saveProgress(time);
    }
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      seekTo(newTime);
    }
  };

  useEffect(() => {
    if (user && audioPath) {
      initializeAudio();
    }
  }, [user, audioPath, bookId]);

  // Auto-save progress on unmount
  useEffect(() => {
    return () => {
      if (currentTime > 0) {
        saveProgress(currentTime);
      }
    };
  }, [currentTime]);

  return {
    audioRef,
    audioUrl,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    progress,
    togglePlay,
    seekTo,
    skip,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    initializeAudio
  };
};
