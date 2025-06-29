
import { Author } from '@/hooks/useBooks';
import { useNavigate } from 'react-router-dom';

interface AuthorCardProps {
  author: Author;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/author/${author.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-all duration-200 cursor-pointer hover:scale-105 transform"
    >
      <div className="flex flex-col items-center space-y-3">
        <img
          src={author.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="text-center">
          <h3 className="text-white font-medium text-sm line-clamp-2">{author.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
