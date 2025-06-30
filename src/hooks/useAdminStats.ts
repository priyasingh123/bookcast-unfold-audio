
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_admin_dashboard_stats');
      
      if (error) {
        console.error('Error fetching admin stats:', error);
        throw error;
      }
      
      return data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
