
import { useState, useMemo } from 'react';
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

const allBooks = [
  {
    id: '1',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    duration: '45m',
    genre: 'romance',
    description: 'A captivating conversation with the legendary Evelyn Hugo herself.'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    duration: '52m',
    genre: 'biography',
    description: 'Join James Clear as he breaks down the science of habit formation.'
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=400&fit=crop',
    duration: '38m',
    genre: 'thriller',
    description: 'A thrilling discussion with psychotherapist Theo Faber.'
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop',
    duration: '61m',
    genre: 'scifi',
    description: 'Paul Atreides shares his journey across the desert planet Arrakis.'
  },
  {
    id: '5',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    duration: '43m',
    genre: 'mystery',
    description: 'Elizabeth and the gang solve mysteries over tea and biscuits.'
  },
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
  },
  {
    id: '14',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    duration: '41m',
    genre: 'fiction',
    description: 'Kya Clark tells her story of survival in the North Carolina marshlands.'
  },
  {
    id: '15',
    title: 'It Ends with Us',
    author: 'Colleen Hoover',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
    duration: '39m',
    genre: 'romance',
    description: 'Lily Bloom shares her powerful story of love and resilience.'
  },
  {
    id: '16',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    duration: '47m',
    genre: 'biography',
    description: 'Morgan Housel discusses the psychology behind financial decisions.'
  }
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    return allBooks.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleTopSearchClick = (search: string) => {
    setSearchQuery(search);
  };

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
                  onClick={() => handleTopSearchClick(search)}
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
              {allBooks.slice(5, 9).map((book) => (
                <BookCard key={book.id} book={book} size="medium" />
              ))}
            </div>
          </div>
        </>
      )}

      {searchQuery && (
        <div className="px-4">
          <p className="text-gray-400 mb-4">
            {filteredBooks.length > 0 
              ? `${filteredBooks.length} result${filteredBooks.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : `No results found for "${searchQuery}"`
            }
          </p>
          
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
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
