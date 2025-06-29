
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const { data: hasAdminAccess, isLoading: checkingAdmin, error } = useQuery({
    queryKey: ['adminAccess', user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      console.log('AdminProtectedRoute: Checking admin access for user:', user.email, 'ID:', user.id);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'accepted')
        .maybeSingle(); // Use maybeSingle() to avoid 406 errors

      console.log('AdminProtectedRoute: Admin access result:', { data, error });

      if (error) {
        console.error('AdminProtectedRoute: Error checking admin access:', error);
        return false;
      }

      return !!data;
    },
    enabled: !!user,
    retry: 1, // Only retry once to avoid infinite loops
  });

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user || hasAdminAccess === false) {
    console.log('AdminProtectedRoute: Redirecting to login. User:', !!user, 'Admin access:', hasAdminAccess);
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
