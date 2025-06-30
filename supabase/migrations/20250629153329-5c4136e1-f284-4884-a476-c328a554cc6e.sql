
-- First, let's insert the admin user record into the admin_users table
INSERT INTO public.admin_users (email, role, status)
VALUES ('abubasar4999@gmail.com', 'admin', 'accepted')
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  status = 'accepted';

-- Now update it with the user_id once we have the record
UPDATE public.admin_users 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'abubasar4999@gmail.com'
)
WHERE email = 'abubasar4999@gmail.com';

-- Fix the infinite recursion issue by dropping and recreating the RLS policies
DROP POLICY IF EXISTS "Admins can view all admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can invite new admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON public.admin_users;

-- Create new policies that don't cause recursion
CREATE POLICY "Allow authenticated users to view their own admin record" 
  ON public.admin_users 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Allow admins to view all admin users via function" 
  ON public.admin_users 
  FOR SELECT 
  USING (public.has_admin_access(auth.uid()));

CREATE POLICY "Allow admins to insert admin users via function" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (public.has_admin_access(auth.uid()));

CREATE POLICY "Allow admins to update admin users via function" 
  ON public.admin_users 
  FOR UPDATE 
  USING (public.has_admin_access(auth.uid()));
