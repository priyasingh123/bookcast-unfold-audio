
import { useState, useEffect } from 'react';
import { User, Edit3, Clock, Crown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: ''
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  // Fetch user profile
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive"
        });
      } else {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive"
        });
      } else {
        setProfile({
          ...profile,
          full_name: formData.full_name,
          phone: formData.phone
        });
        setIsEditing(false);
        toast({
          title: "Success",
          description: "Profile updated successfully.",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-12 pb-20">
      <div className="px-4">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center border-4 border-purple-500">
              <User size={40} className="text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
              <Edit3 size={14} className="text-white" />
            </button>
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className="text-center bg-gray-900 border-gray-800 text-white"
                placeholder="Full Name"
              />
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="text-center bg-gray-900 border-gray-800 text-white"
                placeholder="Phone Number"
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
                <h1 className="text-2xl font-bold text-white">
                  {profile.full_name || 'Anonymous User'}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Edit3 size={16} className="text-gray-400" />
                </button>
              </div>
              <p className="text-gray-400 mb-2">{user.email}</p>
              {profile.phone && (
                <p className="text-gray-300 text-sm">{profile.phone}</p>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Your Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <Clock size={24} className="text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Hours Listened</p>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <User size={24} className="text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Favorites</p>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <LogOut size={20} className="mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white mt-6">
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
