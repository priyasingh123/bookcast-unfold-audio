
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Book {
  id: string;
  title: string;
  author: string;
  author_id: string | null;
  cover_url: string | null;
  duration: string | null;
  genre: string;
  description: string | null;
  is_trending: boolean | null;
  popularity_score: number | null;
}

export interface Author {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
}

export interface Genre {
  id: string;
  name: string;
  color: string | null;
  gradient: string | null;
  icon: string | null;
}

export const useBooks = (genre?: string, authorId?: string) => {
  return useQuery({
    queryKey: ['books', genre, authorId],
    queryFn: async () => {
      let query = supabase
        .from('books')
        .select('*')
        .order('popularity_score', { ascending: false });
      
      if (genre && genre !== 'all') {
        query = query.eq('genre', genre.toLowerCase());
      }
      
      if (authorId) {
        query = query.eq('author_id', authorId);
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

export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching authors:', error);
        throw error;
      }
      
      return data as Author[];
    }
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching genres:', error);
        throw error;
      }
      
      return data as Genre[];
    }
  });
};

export const useSearchBooks = (searchQuery: string) => {
  return useQuery({
    queryKey: ['search-books', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const query = searchQuery.toLowerCase().trim();
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .or(`title.ilike.%${query}%,author.ilike.%${query}%,genre.ilike.%${query}%,description.ilike.%${query}%`)
        .order('popularity_score', { ascending: false });
      
      if (error) {
        console.error('Error searching books:', error);
        throw error;
      }
      
      return data as Book[];
    },
    enabled: !!searchQuery.trim()
  });
};
