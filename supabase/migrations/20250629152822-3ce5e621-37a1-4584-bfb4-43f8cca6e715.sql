
-- Update the admin_users table to link the user account with admin access
-- First, let's update the existing admin record to include the user_id
UPDATE public.admin_users 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'abubasar4999@gmail.com'
),
status = 'accepted'
WHERE email = 'abubasar4999@gmail.com';
