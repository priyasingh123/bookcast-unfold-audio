
import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import BookCard from '../components/BookCard';
import { Input } from '@/components/ui/input';

const topSearches = [
  'The Seven Husbands of Evelyn Hugo',
  'Where the Crawdads Sing',
  'It Ends with Us',
  'The Psychology of Money',
  'Atomic Habits'
];

const famousBooks = [
  {
    id: '10',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop',
    duration: '52m',
    genre: 'fiction',
    description: 'Winston Smith navigates life under Big Brother\'s watchful eye.'
  },
  {
    id: '11',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    duration: '48m',
    genre: 'fiction',
    description: 'Scout Finch shares her childhood experiences in Depression-era Alabama.'
  },
  {
    id: '12',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    duration: '43m',
    genre: 'fiction',
    description: 'Jay Gatsby tells his story of love and the American Dream.'
  },
  {
    id: '13',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    duration: '56m',
    genre: 'romance',
    description: 'Elizabeth Bennet discusses love, marriage, and social expectations.'
  }
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
            className="pl-10 h-12 bg-gray-900 border-gray-800 text-white placeholder:text-gray-400 focus:border-purple-500"
          />
        </div>
      </div>

      {!searchQuery && (
        <>
          <div className="px-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-purple-400" />
              <h2 className="text-xl font-bold text-white">Top Searches</h2>
            </div>
            <div className="space-y-2">
              {topSearches.map((search, index) => (
                <button
                  key={index}
                  className="block w-full text-left py-3 px-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors"
                >
                  <span className="text-white">{search}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-4">
            <h2 className="text-xl font-bold text-white mb-4">Famous Books</h2>
            <div className="grid grid-cols-2 gap-4">
              {famousBooks.map((book) => (
                <BookCard key={book.id} book={book} size="medium" />
              ))}
            </div>
          </div>
        </>
      )}

      {searchQuery && (
        <div className="px-4">
          <p className="text-gray-400 mb-4">Searching for "{searchQuery}"...</p>
          <div className="text-center py-12">
            <p className="text-gray-500">Search functionality coming soon!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
