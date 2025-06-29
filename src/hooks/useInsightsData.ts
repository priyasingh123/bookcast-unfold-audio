
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface InsightsData {
  genderData: Array<{ name: string; value: number; color: string }>;
  countryData: Array<{ country: string; users: number; percentage: number }>;
  hourlyData: Array<{ hour: string; listeners: number }>;
  growthData: Array<{ period: string; users: number }>;
  completionData: Array<{ book: string; completion: number }>;
  powerUsers: Array<{ name: string; totalTime: string; booksCompleted: number }>;
}

export const useInsightsData = () => {
  return useQuery({
    queryKey: ['insights-data'],
    queryFn: async (): Promise<InsightsData> => {
      // Get user count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get books with likes
      const { data: booksWithLikes } = await supabase
        .from('books')
        .select(`
          title,
          author,
          book_likes(count)
        `)
        .eq('status', 'active')
        .limit(5);

      // Get user stats for power users
      const { data: userStats } = await supabase
        .from('user_stats')
        .select(`
          total_listening_time,
          books_completed,
          profiles(full_name)
        `)
        .order('total_listening_time', { ascending: false })
        .limit(5);

      // Get genres distribution
      const { data: genreStats } = await supabase
        .from('books')
        .select('genre')
        .eq('status', 'active');

      // Calculate genre distribution
      const genreCount: Record<string, number> = {};
      genreStats?.forEach(book => {
        genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
      });

      const totalBooks = genreStats?.length || 0;
      const topGenres = Object.entries(genreCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 4)
        .map(([genre, count]) => ({
          country: genre,
          users: count,
          percentage: Math.round((count / totalBooks) * 100)
        }));

      // Format completion data
      const completionData = booksWithLikes?.map(book => ({
        book: book.title,
        completion: Math.floor(Math.random() * 30) + 70 // Random completion rate between 70-100%
      })) || [];

      // Format power users
      const powerUsers = userStats?.map((stat, index) => {
        const hours = Math.floor(stat.total_listening_time / 60);
        const minutes = stat.total_listening_time % 60;
        return {
          name: stat.profiles?.full_name || `User ${index + 1}`,
          totalTime: `${hours}h ${minutes}m`,
          booksCompleted: stat.books_completed
        };
      }) || [];

      // Mock data for charts that require more complex analytics
      const genderData = [
        { name: 'Female', value: 68, color: '#8B5CF6' },
        { name: 'Male', value: 28, color: '#06B6D4' },
        { name: 'Other', value: 4, color: '#10B981' }
      ];

      const countryData = [
        { country: 'United States', users: Math.floor((totalUsers || 0) * 0.366), percentage: 36.6 },
        { country: 'Canada', users: Math.floor((totalUsers || 0) * 0.159), percentage: 15.9 },
        { country: 'United Kingdom', users: Math.floor((totalUsers || 0) * 0.134), percentage: 13.4 },
        { country: 'Australia', users: Math.floor((totalUsers || 0) * 0.107), percentage: 10.7 },
        { country: 'Germany', users: Math.floor((totalUsers || 0) * 0.079), percentage: 7.9 },
        { country: 'Others', users: Math.floor((totalUsers || 0) * 0.155), percentage: 15.5 }
      ];

      const hourlyData = [
        { hour: '6 AM', listeners: Math.floor(Math.random() * 50) + 20 },
        { hour: '8 AM', listeners: Math.floor(Math.random() * 100) + 80 },
        { hour: '10 AM', listeners: Math.floor(Math.random() * 80) + 60 },
        { hour: '12 PM', listeners: Math.floor(Math.random() * 120) + 100 },
        { hour: '2 PM', listeners: Math.floor(Math.random() * 100) + 80 },
        { hour: '4 PM', listeners: Math.floor(Math.random() * 80) + 60 },
        { hour: '6 PM', listeners: Math.floor(Math.random() * 150) + 120 },
        { hour: '8 PM', listeners: Math.floor(Math.random() * 180) + 150 },
        { hour: '10 PM', listeners: Math.floor(Math.random() * 150) + 120 },
        { hour: '12 AM', listeners: Math.floor(Math.random() * 60) + 40 }
      ];

      const growthData = [
        { period: 'Week 1', users: Math.max(1, (totalUsers || 0) - 391) },
        { period: 'Week 2', users: Math.max(1, (totalUsers || 0) - 324) },
        { period: 'Week 3', users: Math.max(1, (totalUsers || 0) - 202) },
        { period: 'Week 4', users: totalUsers || 1 }
      ];

      return {
        genderData,
        countryData: topGenres.length > 0 ? topGenres : countryData,
        hourlyData,
        growthData,
        completionData,
        powerUsers
      };
    },
    refetchInterval: 60000, // Refetch every minute
  });
};
