import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Share,
  Heart,
  ChevronDown,
} from "lucide-react";

const mockBook = {
  id: "1",
  title: "The Seven Husbands of Evelyn Hugo",
  author: "Taylor Jenkins Reid",
  cover:
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  host: "Sarah Chen",
  guest: "Evelyn Hugo",
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const PlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const fetchAudio = async () => {
      const publicUrl = `https://hryrkyufzevewzovwqer.supabase.co/storage/v1/object/sign/podcasts/alchemist.mp3?token=${
        import.meta.env.VITE_AUDIO_TOKEN
      }`;

      setAudioUrl(publicUrl);
    };

    fetchAudio();

    // const fetchSignedUrl = async () => {
    //   try {
    //     const {
    //       data: { signedUrl },
    //     } = await supabase.storage
    //       .from("podcasts")
    //       .createSignedUrl(
    //         "https://hryrkyufzevewzovwqer.supabase.co/storage/v1/object/sign/podcasts/alchemist.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NDY1YTNiMy05OTA1LTQ5OGYtOTJkNS1hNTdiMmQ2MzM5NzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb2RjYXN0cy9hbGNoZW1pc3QubXAzIiwiaWF0IjoxNzUxMTI2MzAzLCJleHAiOjE3NTE3MzExMDN9.rC5DD5fiscBjl4AQ-7r2tDfwLJs6UWy8Suox1qJ5cD8",
    //         604800
    //       );

    //     // Do something with signedUrl
    //     console.log(signedUrl);
    //   } catch (error) {
    //     console.error("Error fetching signed URL:", error);
    //   }
    // };

    // fetchSignedUrl();
  }, []);
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (isPlaying) {
  //     interval = setInterval(() => {
  //       setCurrentTime((prev) => Math.min(prev + 1, mockBook.duration));
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${Math.ceil(secs)}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockBook.title,
        text: `Listen to ${mockBook.title} by ${mockBook.author}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronDown size={24} className="text-white" />
        </button>
        <div className="text-center">
          <p className="text-gray-400 text-sm">PLAYING FROM LIBRARY</p>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <Share size={24} className="text-white" onClick={handleShare} />
        </button>
      </div>

      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center px-8 py-8">
        <div className="w-full max-w-sm">
          <img
            src={mockBook.cover}
            alt={mockBook.title}
            className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Player Controls */}
      <div className="px-6 pb-8">
        {/* Track Info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
            {mockBook.title}
          </h1>
          <p className="text-gray-400 mb-1">{mockBook.author}</p>
          <p className="text-gray-500 text-sm">
            Host: {mockBook.host} • Guest: {mockBook.guest}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-gray-400 text-sm mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
            <SkipBack size={28} className="text-white" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>

          {/* <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            {isPlaying ? (
              <Pause size={32} className="text-black" />
            ) : (
              <Play size={32} className="text-black ml-1" />
            )}
          </button>
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          /> */}
          {/* {audioUrl && (
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )} */}

          <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
            <SkipForward size={28} className="text-white" />
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Share size={24} className="text-gray-400 hover:text-white" />
          </button>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Heart
              size={24}
              className={`${
                isLiked
                  ? "text-purple-400 fill-current"
                  : "text-gray-400 hover:text-white"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
