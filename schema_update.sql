-- Add row_position column to stories table
ALTER TABLE public.stories ADD COLUMN row_position integer;

-- Add a check constraint to ensure row_position is 1, 2, or 3
ALTER TABLE public.stories ADD CONSTRAINT check_row_position 
  CHECK (row_position IS NULL OR row_position IN (1, 2, 3));

-- Add a unique constraint to prevent duplicate positions within the same row
ALTER TABLE public.stories ADD CONSTRAINT unique_row_position 
  UNIQUE (position, row_position);

-- Comments for clarity
COMMENT ON COLUMN public.stories.position IS 'The row number on the frontpage (1-5)';
COMMENT ON COLUMN public.stories.row_position IS 'Position within the row: 1=left, 2=middle, 3=right';
