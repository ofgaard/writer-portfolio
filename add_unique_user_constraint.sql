-- Add unique constraint on user_id to prevent duplicate profiles
ALTER TABLE public.profiles 
  ADD CONSTRAINT unique_user_id UNIQUE (user_id);

-- Add comment for clarity
COMMENT ON CONSTRAINT unique_user_id ON public.profiles IS 'Ensures each user can only have one profile';
