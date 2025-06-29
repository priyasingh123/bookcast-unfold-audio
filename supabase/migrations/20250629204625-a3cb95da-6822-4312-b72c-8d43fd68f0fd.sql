
-- Create policies to allow admin users to manage books
CREATE POLICY "Admins can insert books" 
  ON public.books 
  FOR INSERT 
  TO authenticated
  WITH CHECK (public.has_admin_access(auth.uid()));

CREATE POLICY "Admins can update books" 
  ON public.books 
  FOR UPDATE 
  TO authenticated
  USING (public.has_admin_access(auth.uid()));

CREATE POLICY "Admins can delete books" 
  ON public.books 
  FOR DELETE 
  TO authenticated
  USING (public.has_admin_access(auth.uid()));
