
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/hooks/useBooks';

interface BookCardProps {
  book: Book;
  size?: 'small' | 'medium' | 'large';
}

const BookCard = ({ book, size = 'medium' }: BookCardProps) => {
  const navigate = useNavigate();

  const sizeClasses = {
    small: 'w-32',
    medium: 'w-40',
    large: 'w-48',
  };

  const imageSizes = {
    small: 'h-44',
    medium: 'h-56',
    large: 'h-64',
  };

  return (
    <div 
      className={`${sizeClasses[size]} flex-shrink-0 cursor-pointer group`}
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <div className="relative mb-3">
        <img
          src={book.cover}
          alt={book.title}
          className={`w-full ${imageSizes[size]} object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300`}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
              <Play size={20} className="text-white ml-0.5" />
            </button>
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
              <Heart size={18} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Duration badge */}
        {book.duration && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {book.duration}
          </div>
        )}
      </div>
      
      <div>
        <h3 className="font-semibold text-white text-sm leading-tight mb-1 group-hover:text-purple-300 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-400 text-xs">
          by {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
