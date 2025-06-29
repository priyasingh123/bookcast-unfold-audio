
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowDown, Play, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock book data - in real app this would come from API
const mockBook = {
  id: '1',
  title: 'The Seven Husbands of Evelyn Hugo',
  author: 'Taylor Jenkins Reid',
  cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  duration: '45m',
  genre: 'Romance',
  description: 'Reclusive Hollywood icon Evelyn Hugo finally decides to tell her life story—but only to unknown magazine reporter Monique Grant. Join us for an intimate conversation with the legendary Evelyn Hugo herself as she reveals the truth behind her seven marriages, her rise to fame, and the shocking secret that could destroy everything.',
  host: 'Sarah Chen',
  guestRole: 'Evelyn Hugo (Main Character)',
  releaseDate: 'March 15, 2024',
  isLiked: false,
  audioPath: 'alchemist.mp3'
};

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(mockBook.isLiked);

  const handleStartListening = () => {
    navigate(`/player/${id}`);
  };

  const handleSaveToLibrary = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setIsLiked(!isLiked);
    // In real app, this would save to user's library
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Hero Section with Book Cover */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={mockBook.cover}
            alt={mockBook.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
        >
          <ArrowDown size={20} className="text-white rotate-90" />
        </button>

        {/* Book Info Overlay */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
              {mockBook.title}
            </h1>
            <p className="text-purple-300 text-lg mb-1">
              by {mockBook.author}
            </p>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span>{mockBook.genre}</span>
              <span>•</span>
              <span>{mockBook.duration}</span>
              <span>•</span>
              <span>{mockBook.releaseDate}</span>
            </div>
            {!user && (
              <div className="mt-2 text-green-400 text-sm flex items-center">
                <span>🎵 Free to listen • Sign in to save progress</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleStartListening}
              className="flex-1 bg-white text-black font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <Play size={20} />
              Start Listening
            </button>
            <button
              onClick={handleSaveToLibrary}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isLiked 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Heart size={20} className={isLiked ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6 space-y-6">
        {/* Public Access Notice */}
        <div className="bg-green-800/20 rounded-xl p-4 border-l-4 border-green-500">
          <h3 className="text-white font-semibold mb-2 flex items-center">
            🎵 Free Public Access
          </h3>
          <p className="text-gray-300 text-sm">
            This audiobook is freely available to everyone. 
            {user ? ' Your listening progress is automatically saved.' : ' Sign in to save your progress and create playlists.'}
          </p>
        </div>

        {/* Episode Info */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2">Episode Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Host:</span>
              <span className="text-white">{mockBook.host}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Guest:</span>
              <span className="text-white">{mockBook.guestRole}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">{mockBook.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Access:</span>
              <span className="text-green-400">✓ Public</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-white font-semibold mb-3">About This Episode</h3>
          <p className="text-gray-300 leading-relaxed">
            {mockBook.description}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="text-purple-400 text-sm font-semibold">
              {user ? 'Resume Playback' : 'Free Access'}
            </div>
            <div className="text-gray-400 text-xs">
              {user ? 'Pick up where you left off' : 'No login required'}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="text-purple-400 text-sm font-semibold">Variable Speed</div>
            <div className="text-gray-400 text-xs">0.75x to 2x playback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
