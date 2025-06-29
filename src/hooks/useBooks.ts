
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  duration: string | null;
  genre: string;
  description: string | null;
  is_trending: boolean | null;
  popularity_score: number | null;
}

export const useBooks = (genre?: string) => {
  return useQuery({
    queryKey: ['books', genre],
    queryFn: async () => {
      let query = supabase
        .from('books')
        .select('*')
        .order('popularity_score', { ascending: false });
      
      if (genre && genre !== 'all') {
        query = query.eq('genre', genre);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching books:', error);
        throw error;
      }
      
      return data as Book[];
    }
  });
};

export const useTrendingBooks = () => {
  return useQuery({
    queryKey: ['trending-books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('is_trending', true)
        .order('popularity_score', { ascending: false });
      
      if (error) {
        console.error('Error fetching trending books:', error);
        throw error;
      }
      
      return data as Book[];
    }
  });
};
