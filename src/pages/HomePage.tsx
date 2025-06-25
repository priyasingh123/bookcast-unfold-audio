
import { useState } from 'react';
import TrendingCarousel from '../components/TrendingCarousel';
import GenreSelector from '../components/GenreSelector';
import BookCard from '../components/BookCard';

const mockBooks = [
  {
    id: '6',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    duration: '41m',
    genre: 'fiction',
    description: 'Kya Clark tells her story of isolation and resilience in the marsh.'
  },
  {
    id: '7',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    duration: '39m',
    genre: 'fiction',
    description: 'Nora Seed explores infinite possibilities between life and death.'
  },
  {
    id: '8',
    title: 'It Ends with Us',
    author: 'Colleen Hoover',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    duration: '47m',
    genre: 'romance',
    description: 'Lily Bloom shares her journey of love, loss, and finding strength.'
  },
  {
    id: '9',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    duration: '55m',
    genre: 'biography',
    description: 'Morgan Housel breaks down the behavioral aspects of finance.'
  },
];

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredBooks = selectedGenre === 'all' 
    ? mockBooks 
    : mockBooks.filter(book => book.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-3xl font-bold text-gradient">
          Good evening
        </h1>
        <p className="text-gray-400 mt-1">What would you like to listen to?</p>
      </div>

      {/* Trending Section */}
      <TrendingCarousel />

      {/* Genre Selection */}
      <GenreSelector 
        selectedGenre={selectedGenre} 
        onGenreSelect={setSelectedGenre} 
      />

      {/* Filtered Books Grid */}
      <div className="px-4">
        <h2 className="text-xl font-bold text-white mb-4">
          {selectedGenre === 'all' ? 'Popular Books' : `${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Books`}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} size="medium" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
