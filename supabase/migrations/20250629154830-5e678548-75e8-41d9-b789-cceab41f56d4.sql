
-- Check if the user_id is properly set and update it if needed
UPDATE public.admin_users 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'abubasar4999@gmail.com'
)
WHERE email = 'abubasar4999@gmail.com' AND user_id IS NULL;

-- Verify the admin user record exists and is properly configured
UPDATE public.admin_users 
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'abubasar4999@gmail.com'
),
status = 'accepted',
role = 'admin'
WHERE email = 'abubasar4999@gmail.com';
