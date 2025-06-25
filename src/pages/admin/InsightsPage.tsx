
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const InsightsPage = () => {
  const genderData = [
    { name: 'Female', value: 68, color: '#8B5CF6' },
    { name: 'Male', value: 28, color: '#06B6D4' },
    { name: 'Other', value: 4, color: '#10B981' }
  ];

  const countryData = [
    { country: 'United States', users: 456, percentage: 36.6 },
    { country: 'Canada', users: 198, percentage: 15.9 },
    { country: 'United Kingdom', users: 167, percentage: 13.4 },
    { country: 'Australia', users: 134, percentage: 10.7 },
    { country: 'Germany', users: 98, percentage: 7.9 },
    { country: 'Others', users: 194, percentage: 15.5 }
  ];

  const hourlyData = [
    { hour: '6 AM', listeners: 45 },
    { hour: '8 AM', listeners: 127 },
    { hour: '10 AM', listeners: 89 },
    { hour: '12 PM', listeners: 156 },
    { hour: '2 PM', listeners: 134 },
    { hour: '4 PM', listeners: 98 },
    { hour: '6 PM', listeners: 189 },
    { hour: '8 PM', listeners: 234 },
    { hour: '10 PM', listeners: 198 },
    { hour: '12 AM', listeners: 67 }
  ];

  const growthData = [
    { period: 'Week 1', users: 856 },
    { period: 'Week 2', users: 923 },
    { period: 'Week 3', users: 1045 },
    { period: 'Week 4', users: 1247 }
  ];

  const completionData = [
    { book: 'The Seven Husbands of Evelyn Hugo', completion: 87 },
    { book: 'Where the Crawdads Sing', completion: 82 },
    { book: 'It Ends with Us', completion: 79 },
    { book: 'The Midnight Library', completion: 75 },
    { book: 'The Psychology of Money', completion: 91 }
  ];

  const powerUsers = [
    { name: 'Sarah Johnson', totalTime: '48h 32m', booksCompleted: 23 },
    { name: 'Mike Chen', totalTime: '42h 15m', booksCompleted: 19 },
    { name: 'Emma Wilson', totalTime: '39h 47m', booksCompleted: 18 },
    { name: 'David Brown', totalTime: '37h 22m', booksCompleted: 17 },
    { name: 'Lisa Davis', totalTime: '35h 18m', booksCompleted: 16 }
  ];

  return (
    <div className="space-y-6">
      {/* Gender Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gender Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {genderData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Country Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Users by Country</h3>
          <div className="space-y-3">
            {countryData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{country.country}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{country.users}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Listening Hours */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Peak Listening Hours</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="listeners" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth (Last 4 Weeks)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Completion Rates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Completion Rates</h3>
          <div className="space-y-4">
            {completionData.map((book, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700 truncate">{book.book}</span>
                  <span className="text-sm text-gray-600">{book.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${book.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Power Users */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Power Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Books Completed</th>
              </tr>
            </thead>
            <tbody>
              {powerUsers.map((user, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.totalTime}</td>
                  <td className="py-3 px-4 text-gray-600">{user.booksCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
