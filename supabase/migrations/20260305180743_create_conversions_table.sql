/*
  # Slide to Image Converter - Conversions Table

  1. New Tables
    - `conversions`
      - `id` (uuid, primary key) - Unique identifier for each conversion
      - `filename` (text) - Original file name
      - `file_type` (text) - Type of file (pdf, ppt, pptx)
      - `total_slides` (integer) - Number of slides/pages converted
      - `output_format` (text) - Image format (png, jpg)
      - `created_at` (timestamptz) - When the conversion was performed
      
  2. Security
    - Enable RLS on `conversions` table
    - Add policy for anyone to insert conversion records
    - Add policy for anyone to read conversion records
*/

CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  file_type text NOT NULL,
  total_slides integer NOT NULL DEFAULT 0,
  output_format text NOT NULL DEFAULT 'png',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create conversion records"
  ON conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view conversion records"
  ON conversions
  FOR SELECT
  TO anon
  USING (true);