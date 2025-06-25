
import BookCard from './BookCard';

const mockTrendingBooks = [
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
];

const TrendingCarousel = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold text-white mb-4">Trending Now</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {mockTrendingBooks.map((book) => (
          <BookCard key={book.id} book={book} size="large" />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
