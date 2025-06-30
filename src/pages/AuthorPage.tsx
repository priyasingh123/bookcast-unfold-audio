import { useParams } from 'react-router-dom';
import { useBooks, useAuthors } from '@/hooks/useBooks';
import BookCard from '@/components/BookCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: authors } = useAuthors();
  const { data: books, isLoading } = useBooks(undefined, id);

  const author = authors?.find(a => a.id === id);

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-950 pt-12 pb-20 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Author not found</h1>
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
        
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={author.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{author.name}</h1>
            {author.bio && (
              <p className="text-gray-400">{author.bio}</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-xl font-bold text-white mb-4">Books by {author.name}</h2>
        
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
            <p className="text-gray-400">No books found for this author.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
