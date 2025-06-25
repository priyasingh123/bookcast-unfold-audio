
import { useState } from 'react';
import { User, Edit3, Clock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    bio: 'Book lover and podcast enthusiast. Always looking for the next great story to dive into.',
    totalListeningTime: 247, // in minutes
    booksCompleted: 12,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to database
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-12 pb-20">
      <div className="px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
              <Edit3 size={14} className="text-white" />
            </button>
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="text-center bg-gray-900 border-gray-800 text-white"
              />
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white text-center resize-none"
                rows={3}
              />
              <div className="flex gap-2 justify-center">
                <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Edit3 size={16} className="text-gray-400" />
                </button>
              </div>
              <p className="text-gray-400 mb-2">{profile.email}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Your Stats</h2>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Listening Time</span>
              <span className="text-purple-400 font-semibold">{formatTime(profile.totalListeningTime)}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((profile.totalListeningTime / 500) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {500 - profile.totalListeningTime > 0 
                ? `${formatTime(500 - profile.totalListeningTime)} to next milestone`
                : 'Milestone achieved! 🎉'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <Clock size={24} className="text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{profile.booksCompleted}</p>
              <p className="text-gray-400 text-sm">Books Completed</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <User size={24} className="text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-gray-400 text-sm">Favorites</p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Crown size={24} className="text-yellow-300" />
            <h2 className="text-xl font-bold">Premium Plan</h2>
          </div>
          <p className="text-purple-100 mb-4">
            Unlimited access to all podcast episodes, offline downloads, and exclusive content.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
            Manage Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
