
import { useParams } from 'react-router-dom';
import { useBooks, useGenres } from '@/hooks/useBooks';
import BookCard from '@/components/BookCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GenrePage = () => {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();
  const { data: genres } = useGenres();
  const { data: books, isLoading } = useBooks(genre);

  const genreData = genres?.find(g => g.name.toLowerCase() === genre?.toLowerCase());

  if (!genreData) {
    return (
      <div className="min-h-screen bg-gray-950 pt-12 pb-20 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Genre not found</h1>
          <button 
            onClick={() => navigate('/search')}
            className="text-purple-400 hover:text-purple-300"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-12 pb-20">
      <div className="px-4 mb-6">
        <button 
          onClick={() => navigate('/search')}
          className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Search
        </button>
        
        <div className="mb-6">
          <div className={`bg-gradient-to-r ${genreData.gradient} p-6 rounded-xl mb-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{genreData.name}</h1>
                {genreData.icon && (
                  <span className="text-3xl">{genreData.icon}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-xl font-bold text-white mb-4">{genreData.name} Books</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : books && books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} size="medium" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No books found in this genre.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
