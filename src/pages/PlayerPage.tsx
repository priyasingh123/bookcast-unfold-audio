
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share, Heart, ChevronDown } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import SecureAudioPlayer from '@/components/SecureAudioPlayer';

const mockBook = {
  id: "1",
  title: "The Seven Husbands of Evelyn Hugo",
  author: "Taylor Jenkins Reid",
  cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  host: "Sarah Chen",
  guest: "Evelyn Hugo",
  audioPath: "alchemist.mp3" // This should come from your books database
};

const PlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Redirect to auth if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockBook.title,
        text: `Listen to ${mockBook.title} by ${mockBook.author}`,
        url: window.location.href,
      });
    }
  };

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">Please log in to listen to podcasts</p>
          <button 
            onClick={() => navigate('/auth')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

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
          <p className="text-gray-400 text-sm">SECURE STREAMING</p>
          <p className="text-gray-500 text-xs">Protected Content</p>
        </div>
        <button 
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          onClick={handleShare}
        >
          <Share size={24} className="text-white" />
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

        {/* Secure Audio Player */}
        <SecureAudioPlayer
          bookId={id || '1'}
          audioPath={mockBook.audioPath}
          onPlayStateChange={handlePlayStateChange}
        />

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-8">
          <button 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            onClick={handleShare}
          >
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
