
-- Add password column to admin_users table
ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS password text;

-- Insert the admin user record with password
INSERT INTO public.admin_users (email, role, status, password, user_id)
VALUES (
  'abubasar4999@gmail.com', 
  'admin', 
  'accepted',
  'Abu@121',
  (SELECT id FROM auth.users WHERE email = 'abubasar4999@gmail.com')
)
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  status = 'accepted',
  password = 'Abu@121',
  user_id = (SELECT id FROM auth.users WHERE email = 'abubasar4999@gmail.com');
