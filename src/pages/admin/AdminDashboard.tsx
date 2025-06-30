
import { Clock, Heart, TrendingUp, Users } from 'lucide-react';
import { useAdminStats } from '@/hooks/useAdminStats';

interface AdminStatsData {
  totalListeningTime: number;
  totalUsers: number;
  totalBooks: number;
  activeToday: number;
  topBooks: Array<{ title: string; author: string; likes_count: number }>;
  topCategories: Array<{ name: string; percentage: number }>;
}

const AdminDashboard = () => {
  const { data: statsData, isLoading, error } = useAdminStats();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center text-red-600">
          Error loading dashboard data. Please try again.
        </div>
      </div>
    );
  }

  // Parse the JSON data with proper typing
  const parsedData = (typeof statsData === 'string' ? JSON.parse(statsData) : statsData) as AdminStatsData;
  
  const stats = {
    totalListeningTime: parsedData?.totalListeningTime || 0,
    totalUsers: parsedData?.totalUsers || 0,
    totalBooks: parsedData?.totalBooks || 0,
    activeToday: parsedData?.activeToday || 0
  };

  const topBooks = parsedData?.topBooks || [];
  const topCategories = parsedData?.topCategories || [];

  return (
    <div className="space-y-6">
      {/* North Star Metric */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-purple-100">Total Listening Time</h3>
            <p className="text-3xl font-bold">{formatTime(stats.totalListeningTime)}</p>
            <p className="text-purple-100 text-sm">North Star Metric</p>
          </div>
          <Clock size={48} className="text-purple-200" />
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users size={32} className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Books</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalBooks}</p>
            </div>
            <TrendingUp size={32} className="text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Today</p>
              <p className="text-2xl font-bold text-gray-800">{stats.activeToday}</p>
            </div>
            <Heart size={32} className="text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Most Loved Books */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Most Loved Books</h3>
          <div className="space-y-4">
            {topBooks.length > 0 ? (
              topBooks.map((book: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 truncate">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-1 text-red-500">
                    <Heart size={16} />
                    <span className="font-medium">{book.likes_count}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No book likes yet</p>
            )}
          </div>
        </div>

        {/* Top Performing Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Categories</h3>
          <div className="space-y-4">
            {topCategories.length > 0 ? (
              topCategories.map((category: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">{category.name}</span>
                    <span className="text-gray-600">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No categories available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
