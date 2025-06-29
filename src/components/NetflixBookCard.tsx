
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/hooks/useBooks';

interface NetflixBookCardProps {
  book: Book;
  size?: 'small' | 'medium' | 'large';
  showStartListening?: boolean;
}

const NetflixBookCard = ({ book, size = 'medium', showStartListening = false }: NetflixBookCardProps) => {
  const navigate = useNavigate();

  const sizeClasses = {
    small: 'w-32',
    medium: 'w-40 md:w-48',
    large: 'w-48 md:w-64',
  };

  const imageSizes = {
    small: 'h-44',
    medium: 'h-56 md:h-64',
    large: 'h-64 md:h-80',
  };

  return (
    <div 
      className={`${sizeClasses[size]} flex-shrink-0 cursor-pointer group transition-all duration-300 hover:scale-105`}
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <div className="relative mb-3">
        <img
          src={book.cover_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'}
          alt={book.title}
          className={`w-full ${imageSizes[size]} object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300`}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          {showStartListening ? (
            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
              <Play size={20} className="fill-black" />
              Start Listening
            </button>
          ) : (
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
              <Play size={20} className="text-white ml-0.5" />
            </button>
          )}
        </div>
        
        {/* Duration badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {book.duration}
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-white text-sm leading-tight mb-1 group-hover:text-purple-300 transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-400 text-xs">
          by {book.author}
        </p>
      </div>
    </div>
  );
};

export default NetflixBookCard;
