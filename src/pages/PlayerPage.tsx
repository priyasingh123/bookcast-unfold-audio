
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Share, Heart, ChevronDown } from 'lucide-react';

const mockBook = {
  id: '1',
  title: 'The Seven Husbands of Evelyn Hugo',
  author: 'Taylor Jenkins Reid',
  cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  duration: 2700, // in seconds (45 minutes)
  host: 'Sarah Chen',
  guest: 'Evelyn Hugo'
};

const PlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, mockBook.duration));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
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
            max={mockBook.duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-gray-400 text-sm mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(mockBook.duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
            <SkipBack size={28} className="text-white" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            {isPlaying ? (
              <Pause size={32} className="text-black" />
            ) : (
              <Play size={32} className="text-black ml-1" />
            )}
          </button>
          
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
              className={`${isLiked ? 'text-purple-400 fill-current' : 'text-gray-400 hover:text-white'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
