
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Gauge } from 'lucide-react';
import { useSecureAudio } from '@/hooks/useSecureAudio';
import { useAuth } from '@/contexts/AuthContext';

interface SecureAudioPlayerProps {
  bookId: string;
  audioPath: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const SecureAudioPlayer: React.FC<SecureAudioPlayerProps> = ({
  bookId,
  audioPath,
  onPlayStateChange
}) => {
  const { user } = useAuth();
  const [currentSpeed, setCurrentSpeed] = React.useState(1);
  const {
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
    handleEnded
  } = useSecureAudio({ bookId, audioPath });

  React.useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seekTo(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="ml-2 text-white">Loading audio...</span>
      </div>
    );
  }

  if (!audioUrl) {
    return (
      <div className="text-center text-gray-400 p-4">
        Unable to load audio. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hidden audio element with optimizations */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #ffffff 0%, #ffffff ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-gray-400 text-sm mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        {/* Resume indicator - only show for authenticated users */}
        {user && progress && progress.current_position > 0 && (
          <div className="flex items-center text-purple-400 text-xs mt-1">
            <RotateCcw size={12} className="mr-1" />
            <span>Resume from {formatTime(progress.current_position)}</span>
          </div>
        )}

        {/* Guest notice */}
        {!user && (
          <div className="flex items-center text-yellow-400 text-xs mt-1">
            <span>👤 Sign in to save your listening progress</span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-8">
        <button 
          onClick={() => skip(-15)}
          className="p-3 hover:bg-gray-800 rounded-full transition-colors"
          disabled={!audioUrl}
        >
          <SkipBack size={28} className="text-white" />
        </button>

        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
          disabled={!audioUrl || isLoading}
        >
          {isPlaying ? (
            <Pause size={32} className="text-black" />
          ) : (
            <Play size={32} className="text-black ml-1" />
          )}
        </button>

        <button 
          onClick={() => skip(15)}
          className="p-3 hover:bg-gray-800 rounded-full transition-colors"
          disabled={!audioUrl}
        >
          <SkipForward size={28} className="text-white" />
        </button>
      </div>

      {/* Enhanced Playback Speed Control */}
      <div className="flex items-center justify-center mt-6">
        <div className="bg-gray-800 rounded-full p-1 flex items-center gap-1">
          <Gauge size={16} className="text-gray-400 ml-2" />
          <span className="text-gray-400 text-sm mr-2">Speed</span>
          {speedOptions.map((speed) => (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                currentSpeed === speed
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecureAudioPlayer;
