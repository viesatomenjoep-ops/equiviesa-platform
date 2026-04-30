-- ==========================================
-- FILE: supabase_rbac.sql
-- ==========================================
-- 1. Create the admin_permissions table
CREATE TABLE IF NOT EXISTS admin_permissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'staff', -- 'superadmin' or 'staff'
    permissions JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Set up row level security
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;

-- 3. Delete old policies if they exist
DROP POLICY IF EXISTS "Unlimited access admin_permissions" ON admin_permissions;

-- 4. Recreate policies
CREATE POLICY "Unlimited access admin_permissions" ON admin_permissions FOR ALL USING (true) WITH CHECK (true);

-- 5. Grant permissions to anon and authenticated users
GRANT ALL ON TABLE public.admin_permissions TO anon, authenticated;

-- 6. Insert the Super Admin (tomvanbiene@gmail.com)
-- We use ON CONFLICT to avoid errors if it already exists
INSERT INTO admin_permissions (email, role, permissions) 
VALUES (
  'tomvanbiene@gmail.com', 
  'superadmin', 
  '{"all": true}'::jsonb
)
ON CONFLICT (email) DO UPDATE SET role = 'superadmin', permissions = '{"all": true}'::jsonb;

-- Also add tomjo118735@gmail.com just in case he logs in with that
INSERT INTO admin_permissions (email, role, permissions) 
VALUES (
  'tomjo118735@gmail.com', 
  'superadmin', 
  '{"all": true}'::jsonb
)
ON CONFLICT (email) DO UPDATE SET role = 'superadmin', permissions = '{"all": true}'::jsonb;

-- 7. Reload schema
NOTIFY pgrst, 'reload schema';


-- ==========================================
-- FILE: supabase/migrations/0001_initial_schema.sql
-- ==========================================
-- Create enum types
CREATE TYPE price_category AS ENUM ('€10k-25k', '€25k-50k', '€50k-100k', 'Price on Request');
CREATE TYPE horse_gender AS ENUM ('Mare', 'Gelding', 'Stallion');
CREATE TYPE horse_discipline AS ENUM ('Dressage', 'Showjumping', 'Hunter', 'Eventing');
CREATE TYPE horse_status AS ENUM ('Available', 'Under Offer / Vet Check', 'Sold');
CREATE TYPE media_type AS ENUM ('image', 'video', 'document');
CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Closed');

-- Create horses table
CREATE TABLE horses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_category price_category NOT NULL,
  birth_year INTEGER NOT NULL,
  gender horse_gender NOT NULL,
  height_cm INTEGER,
  discipline horse_discipline NOT NULL,
  experience_level TEXT,
  sire TEXT,
  dam_sire TEXT,
  description TEXT,
  status horse_status DEFAULT 'Available' NOT NULL,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create media table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type media_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  horse_id UUID REFERENCES horses(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  message TEXT NOT NULL,
  status lead_status DEFAULT 'New' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE horses ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read-only)
CREATE POLICY "Public profiles are viewable by everyone." ON horses
  FOR SELECT USING (true);

CREATE POLICY "Public media is viewable by everyone." ON media
  FOR SELECT USING (true);

-- Leads can be created by anyone (public inquiry form)
CREATE POLICY "Anyone can insert a lead." ON leads
  FOR INSERT WITH CHECK (true);

-- Create policies for authenticated admins (All access)
-- Assuming admin users are authenticated via Supabase Auth
CREATE POLICY "Admins can manage horses." ON horses
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage media." ON media
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins can view and manage leads." ON leads
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ==========================================
-- FILE: supabase/migrations/0002_news_schema.sql
-- ==========================================
-- Create news table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read-only)
CREATE POLICY "Public news are viewable by everyone." ON news
  FOR SELECT USING (true);

-- Create policies for authenticated admins (All access)
CREATE POLICY "Admins can manage news." ON news
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Grant privileges to standard web roles
GRANT ALL ON TABLE news TO anon, authenticated, service_role;


-- ==========================================
-- FILE: supabase/migrations/0003_team_schema.sql
-- ==========================================
-- Create team_members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read-only)
CREATE POLICY "Public team members are viewable by everyone." ON team_members
  FOR SELECT USING (true);

-- Create policies for authenticated admins (All access)
CREATE POLICY "Admins can manage team members." ON team_members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Grant privileges to standard web roles
GRANT ALL ON TABLE team_members TO anon, authenticated, service_role;


-- ==========================================
-- FILE: supabase/migrations/0004_horse_documents.sql
-- ==========================================
ALTER TABLE horses
ADD COLUMN doc_vet_check TEXT,
ADD COLUMN doc_xrays TEXT,
ADD COLUMN doc_passport TEXT,
ADD COLUMN link_fei TEXT,
ADD COLUMN link_horsetelex TEXT,
ADD COLUMN link_video TEXT;


-- ==========================================
-- FILE: supabase/migrations/0005_instagram_references.sql
-- ==========================================
CREATE TABLE IF NOT EXISTS instagram_references (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url TEXT NOT NULL,
    horse_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS policies
ALTER TABLE instagram_references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on instagram_references"
    ON instagram_references FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated full access on instagram_references"
    ON instagram_references FOR ALL
    USING (auth.role() = 'authenticated');


-- ==========================================
-- FILE: supabase_entergravity_fase1.sql
-- ==========================================
-- 1. Create facilities table
CREATE TABLE IF NOT EXISTS facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Box', 'Stapmolen', 'Rijbak', 'Paddock', 'Weide', 'Overig')),
    status TEXT DEFAULT 'Available',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Update horses table for Stable Management
-- We add these columns as IF NOT EXISTS so the script is safe to run multiple times.
ALTER TABLE horses 
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES admin_permissions(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS current_box_id UUID REFERENCES facilities(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS passport_number TEXT,
ADD COLUMN IF NOT EXISTS chip_number TEXT,
ADD COLUMN IF NOT EXISTS management_status TEXT DEFAULT 'Active' CHECK (management_status IN ('Active', 'Resting', 'Rehabilitation', 'Sold', 'Deceased')),
ADD COLUMN IF NOT EXISTS tack_info TEXT;

-- 3. Create tasks (Digitaal Whiteboard) table
CREATE TABLE IF NOT EXISTS stable_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
    assigned_user_id UUID REFERENCES admin_permissions(id) ON DELETE SET NULL,
    task_type TEXT NOT NULL CHECK (task_type IN ('Training', 'Medisch', 'Voeding', 'Verzorging', 'Overig')),
    title TEXT NOT NULL,
    status TEXT DEFAULT 'To-do' CHECK (status IN ('To-do', 'Bezig', 'Klaar')),
    scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Create feeding_schedules table
CREATE TABLE IF NOT EXISTS feeding_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID REFERENCES horses(id) ON DELETE CASCADE UNIQUE,
    roughage TEXT, -- e.g. "3 plakken hooi"
    concentrates TEXT, -- e.g. "2 scheppen sportbrok"
    supplements TEXT,
    medication TEXT,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Row Level Security Policies
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE stable_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users (staff, grooms, managers) to view and manage these tables
DROP POLICY IF EXISTS "Authenticated users can view facilities" ON facilities;
CREATE POLICY "Authenticated users can view facilities" ON facilities FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage facilities" ON facilities;
CREATE POLICY "Authenticated users can manage facilities" ON facilities FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view tasks" ON stable_tasks;
CREATE POLICY "Authenticated users can view tasks" ON stable_tasks FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage tasks" ON stable_tasks;
CREATE POLICY "Authenticated users can manage tasks" ON stable_tasks FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view feeding schedules" ON feeding_schedules;
CREATE POLICY "Authenticated users can view feeding schedules" ON feeding_schedules FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage feeding schedules" ON feeding_schedules;
CREATE POLICY "Authenticated users can manage feeding schedules" ON feeding_schedules FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_stable_tasks_modtime ON stable_tasks;
CREATE TRIGGER update_stable_tasks_modtime
BEFORE UPDATE ON stable_tasks
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

DROP TRIGGER IF EXISTS update_feeding_schedules_modtime ON feeding_schedules;
CREATE TRIGGER update_feeding_schedules_modtime
BEFORE UPDATE ON feeding_schedules
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 7. Insert some initial dummy facilities (Boxes) if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM facilities LIMIT 1) THEN
    INSERT INTO facilities (name, type) VALUES 
    ('Box 1', 'Box'),
    ('Box 2', 'Box'),
    ('Stapmolen 1', 'Stapmolen'),
    ('Buitenrijbak', 'Rijbak');
  END IF;
END $$;


-- ==========================================
-- FILE: supabase_equihub_nuclear.sql
-- ==========================================
-- 1. Create facilities table
CREATE TABLE IF NOT EXISTS facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Box',
    status TEXT DEFAULT 'Available',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Update horses table (zonder harde restricties om errors te voorkomen)
ALTER TABLE horses ADD COLUMN IF NOT EXISTS owner_id UUID;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS current_box_id UUID;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS passport_number TEXT;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS chip_number TEXT;
ALTER TABLE horses ADD COLUMN IF NOT EXISTS management_status TEXT DEFAULT 'Active';
ALTER TABLE horses ADD COLUMN IF NOT EXISTS tack_info TEXT;

-- 3. Create stable_tasks (puur en simpel, geen harde relaties die de boel kunnen slopen)
CREATE TABLE IF NOT EXISTS stable_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID,
    assigned_user_id UUID,
    task_type TEXT NOT NULL DEFAULT 'Training',
    title TEXT NOT NULL,
    status TEXT DEFAULT 'To-do',
    scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Create feeding_schedules
CREATE TABLE IF NOT EXISTS feeding_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID,
    roughage TEXT,
    concentrates TEXT,
    supplements TEXT,
    medication TEXT,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Zet Row Level Security VOLLEDIG UIT voor deze tabellen
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE stable_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules DISABLE ROW LEVEL SECURITY;

-- 6. Geef expliciete lees/schrijf rechten aan de API van de website
GRANT ALL ON TABLE facilities TO anon, authenticated, service_role;
GRANT ALL ON TABLE stable_tasks TO anon, authenticated, service_role;
GRANT ALL ON TABLE feeding_schedules TO anon, authenticated, service_role;

-- 7. Voeg wat test-boxen toe (zodat het scherm in het CMS gelijk vol staat)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM facilities LIMIT 1) THEN
    INSERT INTO facilities (name, type) VALUES 
    ('Box 1', 'Box'),
    ('Box 2', 'Box'),
    ('Box 3', 'Box'),
    ('Stapmolen 1', 'Stapmolen'),
    ('Buitenrijbak', 'Rijbak');
  END IF;
END $$;


-- ==========================================
-- FILE: supabase_appointments.sql
-- ==========================================
-- 1. Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Set up row level security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- 3. Delete old policies if they exist
DROP POLICY IF EXISTS "Unlimited access appointments" ON appointments;

-- 4. Recreate policies
CREATE POLICY "Unlimited access appointments" ON appointments FOR ALL USING (true) WITH CHECK (true);

-- 5. Grant permissions to anon and authenticated users
GRANT ALL ON TABLE public.appointments TO anon, authenticated;

-- 6. Reload schema
NOTIFY pgrst, 'reload schema';


-- ==========================================
-- FILE: supabase_breeding.sql
-- ==========================================
-- ==========================================
-- VIESA STABLE MANAGEMENT - BREEDING MODULE
-- ==========================================

CREATE TABLE IF NOT EXISTS breeding_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID, -- De merrie
    stallion_name TEXT NOT NULL,
    insemination_date DATE NOT NULL,
    scan_14_days_date DATE,
    scan_14_days_result TEXT DEFAULT 'Pending', -- 'Pending', 'Pregnant', 'Empty'
    scan_45_days_date DATE,
    scan_45_days_result TEXT DEFAULT 'Pending',
    expected_due_date DATE,
    status TEXT DEFAULT 'Inseminated', -- 'Inseminated', 'Pregnant', 'Empty', 'Foaled'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Zet Row Level Security VOLLEDIG UIT om errors te voorkomen
ALTER TABLE breeding_logs DISABLE ROW LEVEL SECURITY;

-- Geef de website rechten
GRANT ALL ON TABLE breeding_logs TO anon, authenticated, service_role;

-- Voeg wat dummy-data toe om het direct te kunnen zien
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM breeding_logs LIMIT 1) THEN
    INSERT INTO breeding_logs (stallion_name, insemination_date, expected_due_date, status) VALUES 
    ('Chacco-Blue', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '330 days', 'Inseminated'),
    ('Cornet Obolensky', CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '280 days', 'Pregnant');
  END IF;
END $$;


-- ==========================================
-- FILE: supabase_horse_results.sql
-- ==========================================
-- 1. Create the horse_results table
CREATE TABLE IF NOT EXISTS horse_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    horse_id UUID REFERENCES horses(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    event_name TEXT NOT NULL,
    level TEXT NOT NULL,
    result TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Set up row level security
ALTER TABLE horse_results ENABLE ROW LEVEL SECURITY;

-- 3. Delete old policies if they exist
DROP POLICY IF EXISTS "Unlimited access horse_results" ON horse_results;

-- 4. Recreate policies
CREATE POLICY "Unlimited access horse_results" ON horse_results FOR ALL USING (true) WITH CHECK (true);

-- 5. Grant permissions to anon and authenticated users
GRANT ALL ON TABLE public.horse_results TO anon, authenticated;

-- 6. Reload schema
NOTIFY pgrst, 'reload schema';


-- ==========================================
-- FILE: supabase_inventory.sql
-- ==========================================
-- 1. Create the inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Voer', 'Supplementen', 'Verzorging', 'Materialen'
    description TEXT,
    quantity NUMERIC DEFAULT 0,
    unit TEXT DEFAULT 'stuks', -- e.g., 'kg', 'flessen', 'zakken'
    low_stock_threshold NUMERIC DEFAULT 5,
    supplier TEXT,
    purchase_price NUMERIC DEFAULT 0,
    selling_price NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- In case the table already exists, add the columns
ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS purchase_price NUMERIC DEFAULT 0;
ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS selling_price NUMERIC DEFAULT 0;

-- 2. Create the inventory logs table (to track who took what and when)
CREATE TABLE IF NOT EXISTS inventory_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
    employee_name TEXT NOT NULL, -- Name of the person making the change
    change_amount NUMERIC NOT NULL, -- Positive for adding stock, negative for removing
    reason TEXT, -- e.g., 'Gevoerd aan de paarden', 'Nieuwe levering ontvangen'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Set up Row Level Security (RLS) so the website can read/write
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- Allow unlimited access for now (since we use the app logic to secure it)
DROP POLICY IF EXISTS "Unlimited access inventory_items" ON inventory_items;
DROP POLICY IF EXISTS "Unlimited access inventory_logs" ON inventory_logs;
CREATE POLICY "Unlimited access inventory_items" ON inventory_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Unlimited access inventory_logs" ON inventory_logs FOR ALL USING (true) WITH CHECK (true);

-- 4. Notify PostgREST to reload the schema so the API works immediately
NOTIFY pgrst, 'reload schema';


-- ==========================================
-- FILE: supabase_quotes.sql
-- ==========================================
-- 1. Create the quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quote_number TEXT NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_address TEXT,
    client_company TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    subtotal NUMERIC DEFAULT 0,
    tax_rate NUMERIC DEFAULT 21,
    tax_amount NUMERIC DEFAULT 0,
    total_amount NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'accepted', 'paid'
    type TEXT DEFAULT 'quote', -- 'quote' or 'order'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure the type column exists if the table is already created
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'quote';

-- 2. Create the quote items table
CREATE TABLE IF NOT EXISTS quote_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC DEFAULT 1,
    unit_price NUMERIC DEFAULT 0,
    total NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Set up row level security
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

-- 4. Delete old policies if they exist
DROP POLICY IF EXISTS "Unlimited access quotes" ON quotes;
DROP POLICY IF EXISTS "Unlimited access quote_items" ON quote_items;

-- 5. Recreate policies
CREATE POLICY "Unlimited access quotes" ON quotes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Unlimited access quote_items" ON quote_items FOR ALL USING (true) WITH CHECK (true);

-- 6. Grant permissions to anon and authenticated users
GRANT ALL ON TABLE public.quotes TO anon, authenticated;
GRANT ALL ON TABLE public.quote_items TO anon, authenticated;

-- 7. Reload schema
NOTIFY pgrst, 'reload schema';


-- ==========================================
-- FILE: supabase_analytics.sql
-- ==========================================
-- Add views column to horses table if it doesn't exist
ALTER TABLE horses ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create an RPC function to safely increment the views counter
-- This prevents race conditions when multiple users view at the same time
CREATE OR REPLACE FUNCTION increment_horse_view(horse_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE horses
  SET views = views + 1
  WHERE id = horse_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions for the function
GRANT EXECUTE ON FUNCTION increment_horse_view(UUID) TO anon, authenticated;

-- Reload schema
NOTIFY pgrst, 'reload schema';


-- ==========================================
-- FILE: supabase_page_builder.sql
-- ==========================================
CREATE TABLE IF NOT EXISTS site_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT,
    hero_image TEXT,
    content_blocks JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON site_pages FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON site_pages FOR ALL USING (true) WITH CHECK (true);

-- Insert default investors page if it doesn't exist
INSERT INTO site_pages (slug, title, hero_image, content_blocks) 
VALUES (
  'investors', 
  'Invest in Excellence', 
  '/about-bg.jpg', 
  '[
    {"id": "1", "type": "heading", "content": "Why Invest in Showjumpers?", "size": "text-4xl"},
    {"id": "2", "type": "text", "content": "The equestrian sport has transitioned from a passion-driven pursuit into a highly professional, multi-billion-dollar global industry. At the pinnacle of this industry sits the showjumping market, where demand for top-tier equine athletes consistently outpaces supply.", "size": "text-lg"},
    {"id": "3", "type": "text", "content": "By partnering with Equiviesa, you gain direct access to our extensive network in the heart of the equestrian world: the Netherlands, Belgium, and Germany. We meticulously select, train, and export exceptional horses to the United States, where the market commands significant premiums.", "size": "text-lg"},
    {"id": "4", "type": "heading", "content": "Return on Investment (ROI)", "size": "text-4xl"},
    {"id": "5", "type": "text", "content": "Investing in sport horses is classified as an alternative asset class. While it carries inherent risks, the potential returns significantly outpace traditional markets when managed by experts.", "size": "text-lg"}
  ]'::jsonb
) ON CONFLICT (slug) DO NOTHING;


-- ==========================================
-- FILE: supabase_viesa_expansion.sql
-- ==========================================
-- ==========================================
-- VIESA STABLE MANAGEMENT - EXPANSION PACK
-- ==========================================

-- 1. Contacts & Teams (Dierenartsen, Hoefsmeden, Eigenaren, Personeel)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Other', -- 'Vet', 'Farrier', 'Owner', 'Transporter', 'Staff', 'Other'
    email TEXT,
    phone TEXT,
    company TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Health & Medical Logs (Medisch Dossier per paard)
CREATE TABLE IF NOT EXISTS health_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID,
    type TEXT NOT NULL DEFAULT 'Vet Check', -- 'Vaccination', 'Deworming', 'Dentist', 'Farrier', 'Vet Check', 'Surgery', 'Other'
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    contact_id UUID, -- Koppeling naar de dierenarts/hoefsmid in contacts
    description TEXT,
    cost DECIMAL,
    next_due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Documents (Centrale Documenten opslag)
CREATE TABLE IF NOT EXISTS stable_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horse_id UUID, -- Als NULL, dan is het een algemeen stal-document
    title TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'Other', -- 'Passport', 'X-Ray', 'Vet Report', 'Contract', 'Invoice', 'Other'
    file_url TEXT NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Zet Row Level Security VOLLEDIG UIT om "Permission Denied" errors te voorkomen
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE health_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE stable_documents DISABLE ROW LEVEL SECURITY;

-- 5. Geef expliciete lees/schrijf rechten aan de API
GRANT ALL ON TABLE contacts TO anon, authenticated, service_role;
GRANT ALL ON TABLE health_logs TO anon, authenticated, service_role;
GRANT ALL ON TABLE stable_documents TO anon, authenticated, service_role;

-- 6. Voeg wat test-data toe zodat het CMS meteen leeft
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM contacts LIMIT 1) THEN
    INSERT INTO contacts (name, role, company) VALUES 
    ('Dr. Jansen', 'Vet', 'Dierenkliniek De Paardenkamp'),
    ('Piet Smid', 'Farrier', 'Smederij Piet'),
    ('Stal Transport B.V.', 'Transporter', 'Stal Transport B.V.');
  END IF;
END $$;


-- ==========================================
-- FILE: supabase_viesa_ultimate.sql
-- ==========================================
-- ==========================================
-- VIESA STABLE MANAGEMENT - ULTIMATE EXPANSION
-- ==========================================

-- 1. HORSES TABLE EXTENSIONS (Profielen, Hoogte, Gewicht, etc.)
ALTER TABLE horses 
ADD COLUMN IF NOT EXISTS height TEXT,
ADD COLUMN IF NOT EXISTS weight TEXT,
ADD COLUMN IF NOT EXISTS breed TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS color TEXT;

-- 2. FEEDING SCHEDULES EXTENSION (Plaatjes / Schema uploads)
ALTER TABLE feeding_schedules
ADD COLUMN IF NOT EXISTS feeding_image_url TEXT;

-- 3. TASKS EXTENSION (Uploads in taken)
ALTER TABLE stable_tasks
ADD COLUMN IF NOT EXISTS attachment_url TEXT;

-- 4. FACILITIES EXTENSION (Specifieke locaties zoals Manege, Weide, Paddock)
ALTER TABLE facilities
ADD COLUMN IF NOT EXISTS location_type TEXT DEFAULT 'Box'; -- 'Box', 'Manege', 'Weide', 'Paddock', 'Stapmolen'

-- 5. OPNIEUW RLS UITZETTEN VOOR ADMIN GEMAK TIJDENS ONTWIKKELING
ALTER TABLE horses DISABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules DISABLE ROW LEVEL SECURITY;
ALTER TABLE stable_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE horses TO anon, authenticated, service_role;
GRANT ALL ON TABLE feeding_schedules TO anon, authenticated, service_role;
GRANT ALL ON TABLE stable_tasks TO anon, authenticated, service_role;
GRANT ALL ON TABLE facilities TO anon, authenticated, service_role;
GRANT ALL ON TABLE contacts TO anon, authenticated, service_role;


-- ==========================================
-- FILE: supabase_viesa_breeding.sql
-- ==========================================
-- ==========================================
-- VIESA STABLE MANAGEMENT - BREEDING EXPANSION
-- ==========================================

-- Voeg scan_image_url toe aan breeding_logs voor scan/echo foto's
ALTER TABLE breeding_logs ADD COLUMN IF NOT EXISTS scan_image_url TEXT;

-- Backup RLS bypass
ALTER TABLE breeding_logs DISABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE breeding_logs TO anon, authenticated, service_role;


-- ==========================================
-- FILE: supabase_update_health_docs.sql
-- ==========================================
-- ==========================================
-- VIESA STABLE MANAGEMENT - HEALTH DOCS EXPANSION
-- ==========================================

-- Voeg document_url toe aan health_logs (als deze nog niet bestaat)
ALTER TABLE health_logs ADD COLUMN IF NOT EXISTS document_url TEXT;

-- Zorg ervoor dat iedereen er weer bij kan (als backup)
GRANT ALL ON TABLE health_logs TO anon, authenticated, service_role;


-- ==========================================
-- FILE: supabase_horses_category.sql
-- ==========================================
-- Add category to horses table to separate Sales and Investment horses
ALTER TABLE horses ADD COLUMN IF NOT EXISTS category text DEFAULT 'sales';

-- Optional: If you want to restrict the values, uncomment below
-- ALTER TABLE horses ADD CONSTRAINT check_horse_category CHECK (category IN ('sales', 'investment'));


-- ==========================================
-- FILE: supabase_horses_sort.sql
-- ==========================================
-- Add a sort_order column to the horses table
ALTER TABLE horses ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Optional: Initialize sort_order to match the current chronological order so the current display isn't changed abruptly
WITH ordered_horses AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as new_order
  FROM horses
)
UPDATE horses
SET sort_order = ordered_horses.new_order
FROM ordered_horses
WHERE horses.id = ordered_horses.id;


-- ==========================================
-- FILE: supabase_roi_fields.sql
-- ==========================================
-- Kopieer dit en plak het in je Supabase SQL editor:
-- Ga in Supabase naar: SQL Editor (aan de linkerkant) -> New query
-- Plak deze tekst en klik op "Run" rechtsonder.

ALTER TABLE public.horses 
ADD COLUMN IF NOT EXISTS investment_rationale TEXT,
ADD COLUMN IF NOT EXISTS estimated_roi TEXT;

-- Hierdoor worden de ROI velden aangemaakt in de database zonder dat oude data verloren gaat!


-- ==========================================
-- FILE: update_investors_page.sql
-- ==========================================
-- Update the 'investors' page in the site_pages table with the new english text
UPDATE site_pages
SET content_blocks = '[
  {"id": "1", "type": "heading", "content": "Why Invest in Sporthorses?", "size": "text-4xl"},
  {"id": "2", "type": "text", "content": "The equestrian sport has transitioned from a passion-driven pursuit into a highly professional, multi-billion-dollar global industry. At the pinnacle of this industry sits the showjumping market, where demand for top-tier equine athletes consistently outpaces supply.", "size": "text-lg"},
  {"id": "3", "type": "text", "content": "By partnering with Equiviesa, you gain direct access to our extensive network in the heart of the equestrian world: the Netherlands, Belgium, and Germany. We meticulously select, train, and export exceptional horses to the United States, where the market commands significant premiums.", "size": "text-lg"},
  {"id": "4", "type": "heading", "content": "The Future of Exclusive Capital", "size": "text-3xl"},
  {"id": "5", "type": "text", "content": "In an era dominated by volatile digital markets, algorithmic trading, and unpredictable stock prices, the modern investor seeks robust diversification. Within the portfolios of the world''s most successful investors, a clear trend is emerging: the shift towards tangible, rare, and performance-driven alternative assets. At the absolute intersection of passion, prestige, and exponential returns lies the top sport of showjumping. Investing in elite sporthorses today is no longer an opaque gamble, but a highly strategic and data-driven wealth management decision.", "size": "text-lg"},
  {"id": "6", "type": "heading", "content": "An Uncorrelated Asset Class", "size": "text-2xl"},
  {"id": "7", "type": "text", "content": "The biggest advantage of top sporthorses as an investment is that their value is completely uncorrelated to traditional financial markets. When stocks fall or inflation rises, the intrinsic value of a Grand Prix sporthorse remains exceptionally stable. International top sport is a multi-billion dollar industry driven by Ultra-High-Net-Worth Individuals (UHNWIs), royal families, and global syndicates. The demand for top sport horses capable of performing at the 1.60m level consistently outstrips supply. This creates a scarcity economy where prices for proven talents reach record highs year after year.", "size": "text-lg"},
  {"id": "8", "type": "heading", "content": "From Promise to Blue-Chip: Exponential Value Appreciation", "size": "text-2xl"},
  {"id": "9", "type": "text", "content": "The financial lifecycle of a sporthorse offers unique opportunities for incredible ROI (Return on Investment). The strategy is akin to venture capital: we identify young, raw talent with unprecedented potential. By pairing them with world-class riders and state-of-the-art training programs, we transform these promises into proven top athletes. A 5-year-old talent can, once it proves itself on international stages as a 9- or 10-year-old, multiply its value sixfold. In addition to their trading value, top athletes generate direct returns through explosively rising prize money on circuits like the Global Champions Tour, and through exclusive breeding rights (genetics and embryo trading) that create a lasting income stream.", "size": "text-lg"},
  {"id": "10", "type": "heading", "content": "Investment Rooted in Data and Science", "size": "text-2xl"},
  {"id": "11", "type": "text", "content": "Where horse trading used to revolve around ''gut feeling'', in 2026 it has become an exact science. Our selection procedure eliminates risks by utilizing advanced biometric analyses, predictive genetic models, and detailed veterinary AI scans. We invest exclusively in athletes whose data demonstrates they possess the perfect balance of physical power, reflexes, health, and the mental perseverance required for the absolute world top. You are not investing in an animal; you are investing in a carefully calibrated top sports machine.", "size": "text-lg"},
  {"id": "12", "type": "heading", "content": "Prestige, Network, and the Ultimate Lifestyle", "size": "text-2xl"},
  {"id": "13", "type": "text", "content": "Finally, owning an elite sporthorse offers a dividend that cannot be captured in any graph: exclusive access. As an investor, you buy into one of the most closed and prestigious ecosystems in the world. You gain VIP access to glamorous events from Monaco to Miami and from Paris to Doha. Ownership provides an unparalleled platform for high-level networking, where you stand shoulder-to-shoulder with influential leaders, CEOs, and other top investors in the VIP stands.", "size": "text-lg"},
  {"id": "14", "type": "heading", "content": "Return on Investment (ROI)", "size": "text-4xl"},
  {"id": "15", "type": "text", "content": "Investing in sporthorses is classified as an alternative asset class. While it carries inherent risks, the potential returns significantly outpace traditional markets when managed by experts. It is the perfect synergy between calculated financial return and an extraordinary lifestyle. It is capital that breathes, performs, and wins.", "size": "text-lg"}
]'::jsonb
WHERE slug = 'investors';

-- If it doesn't exist yet, insert it
INSERT INTO site_pages (slug, title, hero_image, content_blocks)
SELECT 'investors', 'Invest in Excellence', '/about-bg.jpg', '[
  {"id": "1", "type": "heading", "content": "Why Invest in Sporthorses?", "size": "text-4xl"},
  {"id": "2", "type": "text", "content": "The equestrian sport has transitioned from a passion-driven pursuit into a highly professional, multi-billion-dollar global industry. At the pinnacle of this industry sits the showjumping market, where demand for top-tier equine athletes consistently outpaces supply.", "size": "text-lg"},
  {"id": "3", "type": "text", "content": "By partnering with Equiviesa, you gain direct access to our extensive network in the heart of the equestrian world: the Netherlands, Belgium, and Germany. We meticulously select, train, and export exceptional horses to the United States, where the market commands significant premiums.", "size": "text-lg"},
  {"id": "4", "type": "heading", "content": "The Future of Exclusive Capital", "size": "text-3xl"},
  {"id": "5", "type": "text", "content": "In an era dominated by volatile digital markets, algorithmic trading, and unpredictable stock prices, the modern investor seeks robust diversification. Within the portfolios of the world''s most successful investors, a clear trend is emerging: the shift towards tangible, rare, and performance-driven alternative assets. At the absolute intersection of passion, prestige, and exponential returns lies the top sport of showjumping. Investing in elite sporthorses today is no longer an opaque gamble, but a highly strategic and data-driven wealth management decision.", "size": "text-lg"},
  {"id": "6", "type": "heading", "content": "An Uncorrelated Asset Class", "size": "text-2xl"},
  {"id": "7", "type": "text", "content": "The biggest advantage of top sporthorses as an investment is that their value is completely uncorrelated to traditional financial markets. When stocks fall or inflation rises, the intrinsic value of a Grand Prix sporthorse remains exceptionally stable. International top sport is a multi-billion dollar industry driven by Ultra-High-Net-Worth Individuals (UHNWIs), royal families, and global syndicates. The demand for top sport horses capable of performing at the 1.60m level consistently outstrips supply. This creates a scarcity economy where prices for proven talents reach record highs year after year.", "size": "text-lg"},
  {"id": "8", "type": "heading", "content": "From Promise to Blue-Chip: Exponential Value Appreciation", "size": "text-2xl"},
  {"id": "9", "type": "text", "content": "The financial lifecycle of a sporthorse offers unique opportunities for incredible ROI (Return on Investment). The strategy is akin to venture capital: we identify young, raw talent with unprecedented potential. By pairing them with world-class riders and state-of-the-art training programs, we transform these promises into proven top athletes. A 5-year-old talent can, once it proves itself on international stages as a 9- or 10-year-old, multiply its value sixfold. In addition to their trading value, top athletes generate direct returns through explosively rising prize money on circuits like the Global Champions Tour, and through exclusive breeding rights (genetics and embryo trading) that create a lasting income stream.", "size": "text-lg"},
  {"id": "10", "type": "heading", "content": "Investment Rooted in Data and Science", "size": "text-2xl"},
  {"id": "11", "type": "text", "content": "Where horse trading used to revolve around ''gut feeling'', in 2026 it has become an exact science. Our selection procedure eliminates risks by utilizing advanced biometric analyses, predictive genetic models, and detailed veterinary AI scans. We invest exclusively in athletes whose data demonstrates they possess the perfect balance of physical power, reflexes, health, and the mental perseverance required for the absolute world top. You are not investing in an animal; you are investing in a carefully calibrated top sports machine.", "size": "text-lg"},
  {"id": "12", "type": "heading", "content": "Prestige, Network, and the Ultimate Lifestyle", "size": "text-2xl"},
  {"id": "13", "type": "text", "content": "Finally, owning an elite sporthorse offers a dividend that cannot be captured in any graph: exclusive access. As an investor, you buy into one of the most closed and prestigious ecosystems in the world. You gain VIP access to glamorous events from Monaco to Miami and from Paris to Doha. Ownership provides an unparalleled platform for high-level networking, where you stand shoulder-to-shoulder with influential leaders, CEOs, and other top investors in the VIP stands.", "size": "text-lg"},
  {"id": "14", "type": "heading", "content": "Return on Investment (ROI)", "size": "text-4xl"},
  {"id": "15", "type": "text", "content": "Investing in sporthorses is classified as an alternative asset class. While it carries inherent risks, the potential returns significantly outpace traditional markets when managed by experts. It is the perfect synergy between calculated financial return and an extraordinary lifestyle. It is capital that breathes, performs, and wins.", "size": "text-lg"}
]'::jsonb
WHERE NOT EXISTS (
    SELECT 1 FROM site_pages WHERE slug = 'investors'
);


-- ==========================================
-- FILE: supabase_disable_rls.sql
-- ==========================================
ALTER TABLE stable_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules DISABLE ROW LEVEL SECURITY;


-- ==========================================
-- FILE: supabase_fix_permissions.sql
-- ==========================================
-- Verwijder de oude (te strikte) policies
DROP POLICY IF EXISTS "Authenticated users can view facilities" ON facilities;
DROP POLICY IF EXISTS "Authenticated users can manage facilities" ON facilities;
DROP POLICY IF EXISTS "Authenticated users can view tasks" ON stable_tasks;
DROP POLICY IF EXISTS "Authenticated users can manage tasks" ON stable_tasks;
DROP POLICY IF EXISTS "Authenticated users can view feeding schedules" ON feeding_schedules;
DROP POLICY IF EXISTS "Authenticated users can manage feeding schedules" ON feeding_schedules;

-- Geef de website volledige toegang (omdat de /admin pagina zelf al achter een login zit)
CREATE POLICY "Allow all operations for facilities" ON facilities FOR ALL USING (true);
CREATE POLICY "Allow all operations for stable_tasks" ON stable_tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations for feeding_schedules" ON feeding_schedules FOR ALL USING (true);


-- ==========================================
-- FILE: supabase_grant.sql
-- ==========================================
GRANT ALL ON TABLE stable_tasks TO anon, authenticated, service_role;
GRANT ALL ON TABLE facilities TO anon, authenticated, service_role;
GRANT ALL ON TABLE feeding_schedules TO anon, authenticated, service_role;


