
import { Clock, Heart, TrendingUp, Users } from 'lucide-react';

const AdminDashboard = () => {
  const stats = {
    totalListeningTime: 15420, // minutes
    totalUsers: 1247,
    totalBooks: 156,
    activeToday: 89
  };

  const topBooks = [
    { title: 'The Seven Husbands of Evelyn Hugo', loves: 342, author: 'Taylor Jenkins Reid' },
    { title: 'Where the Crawdads Sing', loves: 298, author: 'Delia Owens' },
    { title: 'It Ends with Us', loves: 267, author: 'Colleen Hoover' },
    { title: 'The Midnight Library', loves: 234, author: 'Matt Haig' },
    { title: 'The Psychology of Money', loves: 198, author: 'Morgan Housel' }
  ];

  const topCategories = [
    { name: 'Fiction', percentage: 35 },
    { name: 'Romance', percentage: 28 },
    { name: 'Biography', percentage: 22 },
    { name: 'Thriller', percentage: 15 }
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
  };

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
            {topBooks.map((book, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 truncate">{book.title}</p>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <Heart size={16} />
                  <span className="font-medium">{book.loves}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Categories</h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
