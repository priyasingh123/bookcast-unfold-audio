
interface Genre {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface GenreSelectorProps {
  selectedGenre: string;
  onGenreSelect: (genreId: string) => void;
}

const genres: Genre[] = [
  { id: 'all', name: 'All', emoji: '🎯', color: 'bg-purple-500' },
  { id: 'fiction', name: 'Fiction', emoji: '📖', color: 'bg-blue-500' },
  { id: 'romance', name: 'Romance', emoji: '💕', color: 'bg-pink-500' },
  { id: 'thriller', name: 'Thriller', emoji: '🔥', color: 'bg-red-500' },
  { id: 'mystery', name: 'Mystery', emoji: '🕵️', color: 'bg-gray-500' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🐉', color: 'bg-green-500' },
  { id: 'scifi', name: 'Sci-Fi', emoji: '🚀', color: 'bg-cyan-500' },
  { id: 'biography', name: 'Biography', emoji: '👤', color: 'bg-orange-500' },
];

const GenreSelector = ({ selectedGenre, onGenreSelect }: GenreSelectorProps) => {
  return (
    <div className="px-4 py-6">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreSelect(genre.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-200 ${
              selectedGenre === genre.id ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                selectedGenre === genre.id 
                  ? genre.color + ' ring-2 ring-white ring-offset-2 ring-offset-gray-950' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {genre.emoji}
            </div>
            <span 
              className={`text-sm font-medium ${
                selectedGenre === genre.id ? 'text-white' : 'text-gray-400'
              }`}
            >
              {genre.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
