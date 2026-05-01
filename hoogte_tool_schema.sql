-- Create the table for Hoogte & Ondervloer scans
CREATE TABLE IF NOT EXISTS public.egaliseren_hoogte_scans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    hoogte_mm NUMERIC NOT NULL,
    ondervloer_type VARCHAR(255) NOT NULL,
    oppervlakte_m2 NUMERIC NOT NULL,
    berekende_zakken INTEGER NOT NULL,
    geschatte_prijs NUMERIC NOT NULL,
    telefoonnummer VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Row Level Security (RLS) but allow anonymous inserts so website visitors can submit calculations
ALTER TABLE public.egaliseren_hoogte_scans ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow public inserts for hoogte scans" ON public.egaliseren_hoogte_scans
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- Allow authenticated admins to view all scans
CREATE POLICY "Allow authenticated read for hoogte scans" ON public.egaliseren_hoogte_scans
    FOR SELECT 
    TO authenticated
    USING (true);
