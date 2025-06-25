
import { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockUsers = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-03-15',
    gender: 'Male',
    country: 'United States'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 987-6543',
    joinDate: '2024-03-10',
    gender: 'Female',
    country: 'Canada'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 (555) 456-7890',
    joinDate: '2024-03-08',
    gender: 'Male',
    country: 'United States'
  },
  {
    id: 4,
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    phone: '+44 20 7946 0958',
    joinDate: '2024-03-05',
    gender: 'Female',
    country: 'United Kingdom'
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+82 2-3456-7890',
    joinDate: '2024-03-01',
    gender: 'Male',
    country: 'South Korea'
  }
];

const UserDataPage = () => {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Join Date', 'Gender', 'Country'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.phone,
        user.joinDate,
        user.gender,
        user.country
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleExportCSV} className="bg-green-600 hover:bg-green-700">
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-800">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">New This Month</p>
          <p className="text-2xl font-bold text-gray-800">23</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Active Today</p>
          <p className="text-2xl font-bold text-gray-800">89</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDataPage;
