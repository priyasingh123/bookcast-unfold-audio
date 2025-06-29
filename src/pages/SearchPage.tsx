
import { useState, useMemo } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import BookCard from '../components/BookCard';
import AuthorCard from '../components/AuthorCard';
import GenreCard from '../components/GenreCard';
import { Input } from '@/components/ui/input';
import { useSearchBooks, useAuthors, useGenres } from '@/hooks/useBooks';

const topSearches = [
  'Atomic Habits',
  'Dune',
  'Romance'
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults = [], isLoading: isSearching } = useSearchBooks(searchQuery);
  const { data: authors = [], isLoading: isLoadingAuthors } = useAuthors();
  const { data: genres = [], isLoading: isLoadingGenres } = useGenres();

  const handleTopSearchClick = (search: string) => {
    setSearchQuery(search);
  };

  const topAuthors = authors.slice(0, 6);
  const topGenres = genres.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-950 pt-12 pb-20">
      <div className="px-4 mb-6">
        <h1 className="text-3xl font-bold text-white mb-4">Search</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search for books, authors, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-gray-900 border-gray-800 text-white placeholder:text-gray-400 focus:border-purple-500 rounded-xl shadow-lg"
          />
        </div>
      </div>

      {!searchQuery && (
        <>
          {/* Top Searches Section */}
          <div className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-purple-400" />
              <h2 className="text-xl font-bold text-white">Top Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {topSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleTopSearchClick(search)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-full transition-colors duration-200 hover:scale-105 transform"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Top Author Searches Section */}
          <div className="px-4 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Top Author Searches</h2>
            {isLoadingAuthors ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-800 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topAuthors.map((author) => (
                  <AuthorCard key={author.id} author={author} />
                ))}
              </div>
            )}
          </div>

          {/* Top Genre Searches Section */}
          <div className="px-4">
            <h2 className="text-xl font-bold text-white mb-4">Top Genre Searches</h2>
            {isLoadingGenres ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topGenres.map((genre) => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {searchQuery && (
        <div className="px-4">
          <p className="text-gray-400 mb-4">
            {isSearching ? 'Searching...' : 
              searchResults.length > 0 
                ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
            }
          </p>
          
          {isSearching ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((book) => (
                <BookCard key={book.id} book={book} size="medium" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search size={48} className="mx-auto mb-2 opacity-50" />
                <p>Try searching for:</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Book titles</li>
                  <li>• Author names</li>
                  <li>• Genres (fiction, romance, thriller, etc.)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
