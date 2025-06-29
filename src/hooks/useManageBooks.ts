
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useManageBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: books, isLoading } = useQuery({
    queryKey: ['admin-books', searchTerm, genreFilter, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,author.ilike.%${searchTerm}%`);
      }

      if (genreFilter !== 'all') {
        query = query.eq('genre', genreFilter);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('genres')
        .select('name')
        .order('name');
      if (error) throw error;
      return data || [];
    },
  });

  const { data: deletedBooks } = useQuery({
    queryKey: ['deleted-books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deleted_books')
        .select('*')
        .order('deleted_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const toggleArchiveMutation = useMutation({
    mutationFn: async ({ id, currentStatus }: { id: string; currentStatus: string }) => {
      const newStatus = currentStatus === 'active' ? 'archived' : 'active';
      const { error } = await supabase
        .from('books')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      return newStatus;
    },
    onSuccess: (newStatus) => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      toast({
        title: newStatus === 'archived' ? 'Book Archived' : 'Book Restored',
        description: `Book has been ${newStatus === 'archived' ? 'archived' : 'restored'} successfully.`,
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update book status.',
        variant: 'destructive',
      });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (book: any) => {
      // First, save to deleted_books table
      const { error: deleteError } = await supabase
        .from('deleted_books')
        .insert({
          original_book_id: book.id,
          title: book.title,
          author: book.author,
          genre: book.genre,
          description: book.description,
          cover_url: book.cover_url,
          audio_path: book.audio_path,
          duration: book.duration,
        });

      if (deleteError) throw deleteError;

      // Then delete from books table
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', book.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['deleted-books'] });
      toast({
        title: 'Book Deleted',
        description: 'Book has been moved to deleted books.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete book.',
        variant: 'destructive',
      });
    },
  });

  const permanentDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('deleted_books')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deleted-books'] });
      toast({
        title: 'Book Permanently Deleted',
        description: 'Book has been permanently removed.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to permanently delete book.',
        variant: 'destructive',
      });
    },
  });

  const restoreBookMutation = useMutation({
    mutationFn: async (deletedBook: any) => {
      // First, restore to books table
      const { error: restoreError } = await supabase
        .from('books')
        .insert({
          title: deletedBook.title,
          author: deletedBook.author,
          genre: deletedBook.genre,
          description: deletedBook.description,
          cover_url: deletedBook.cover_url,
          audio_path: deletedBook.audio_path,
          duration: deletedBook.duration,
          status: 'active',
        });

      if (restoreError) throw restoreError;

      // Then remove from deleted_books table
      const { error } = await supabase
        .from('deleted_books')
        .delete()
        .eq('id', deletedBook.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-books'] });
      queryClient.invalidateQueries({ queryKey: ['deleted-books'] });
      toast({
        title: 'Book Restored',
        description: 'Book has been restored successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to restore book.',
        variant: 'destructive',
      });
    },
  });

  const handleSearch = () => {
    setSearchTerm(tempSearchTerm);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return {
    books,
    deletedBooks,
    genres,
    isLoading,
    searchTerm,
    tempSearchTerm,
    setTempSearchTerm,
    genreFilter,
    setGenreFilter,
    statusFilter,
    setStatusFilter,
    toggleArchiveMutation,
    deleteBookMutation,
    permanentDeleteMutation,
    restoreBookMutation,
    handleSearch,
    handleSearchKeyPress,
  };
};
