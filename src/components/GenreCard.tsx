
import { Genre } from '@/hooks/useBooks';
import { useNavigate } from 'react-router-dom';

interface GenreCardProps {
  genre: Genre;
}

const GenreCard = ({ genre }: GenreCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/genre/${genre.name.toLowerCase()}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-gradient-to-br ${genre.gradient} p-6 rounded-xl hover:scale-105 transform transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-lg">{genre.name}</h3>
          {genre.icon && (
            <span className="text-2xl mt-2 block">{genre.icon}</span>
          )}
        </div>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">→</span>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
