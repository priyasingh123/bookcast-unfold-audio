
interface NetflixGenreSelectorProps {
  selectedGenre: string;
  onGenreSelect: (genreId: string) => void;
}

const genres = [
  { id: 'all', name: 'All' },
  { id: 'fiction', name: 'Fiction' },
  { id: 'romance', name: 'Romance' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'mystery', name: 'Mystery' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'scifi', name: 'Sci-Fi' },
  { id: 'biography', name: 'Biography' },
];

const NetflixGenreSelector = ({ selectedGenre, onGenreSelect }: NetflixGenreSelectorProps) => {
  return (
    <div className="px-4 py-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreSelect(genre.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedGenre === genre.id 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NetflixGenreSelector;
