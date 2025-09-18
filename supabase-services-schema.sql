-- Services Management Schema for Golden Heavy Duty Admin Panel
-- Run these commands in your Supabase SQL editor

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  icon TEXT DEFAULT 'wrench',
  price_range TEXT,
  duration TEXT,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  category TEXT DEFAULT 'general',
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Categories Table
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'folder',
  color TEXT DEFAULT '#3B82F6',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default service categories
INSERT INTO service_categories (name, slug, description, icon, color, sort_order) VALUES
  ('Engine & Transmission', 'engine-transmission', 'Engine repair, transmission service, and powertrain systems', 'settings', '#EF4444', 1),
  ('Brakes & Safety', 'brakes-safety', 'Air brake systems, safety inspections, and brake repairs', 'shield', '#F59E0B', 2),
  ('Electrical & Diagnostics', 'electrical-diagnostics', 'Electrical systems, computer diagnostics, and troubleshooting', 'zap', '#8B5CF6', 3),
  ('Tires & Suspension', 'tires-suspension', 'Tire service, suspension repair, and alignment', 'circle', '#10B981', 4),
  ('Preventative Maintenance', 'preventative-maintenance', 'Regular maintenance, inspections, and service schedules', 'calendar', '#3B82F6', 5),
  ('Emergency Services', 'emergency-services', '24/7 emergency repair and roadside assistance', 'phone', '#DC2626', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert default services
INSERT INTO services (name, slug, description, short_description, icon, price_range, duration, features, category, featured, sort_order) VALUES
  (
    'Engine Repair & Rebuild',
    'engine-repair-rebuild',
    'Complete engine diagnostics, repair, and rebuild services for all heavy-duty truck engines. Our certified technicians use state-of-the-art diagnostic equipment to identify and fix engine problems quickly and efficiently.',
    'Professional engine diagnostics, repair, and rebuild services',
    'settings',
    'Call for quote',
    '1-5 days',
    ARRAY['Engine diagnostics', 'Complete engine rebuilds', 'Cylinder head repair', 'Piston and ring replacement', 'Timing belt service', 'Oil system repair'],
    'engine-transmission',
    true,
    1
  ),
  (
    'Transmission Service',
    'transmission-service',
    'Full transmission service including rebuilds, repairs, and maintenance. We work on all makes and models of heavy-duty transmissions with OEM and premium aftermarket parts.',
    'Complete transmission service and rebuild',
    'gear',
    'Call for quote',
    '1-3 days',
    ARRAY['Transmission rebuild', 'Clutch replacement', 'Torque converter service', 'Shift linkage repair', 'Fluid service', 'Diagnostic testing'],
    'engine-transmission',
    true,
    2
  ),
  (
    'Air Brake System Repair',
    'air-brake-system-repair',
    'Complete air brake system service including chamber replacement, line repair, and system diagnostics. DOT compliance inspections and emergency brake repairs available 24/7.',
    'Complete air brake system service and repair',
    'shield',
    'Call for quote',
    '4-8 hours',
    ARRAY['Brake chamber replacement', 'Air line repair', 'ABS system service', 'DOT compliance inspection', 'Emergency brake repair', 'System diagnostics'],
    'brakes-safety',
    true,
    3
  ),
  (
    'Electrical Diagnostics',
    'electrical-diagnostics',
    'Advanced electrical system diagnostics and repair using professional-grade equipment. We troubleshoot and fix all electrical issues from simple wiring problems to complex computer system failures.',
    'Professional electrical system diagnostics',
    'zap',
    'Call for quote',
    '2-6 hours',
    ARRAY['Computer diagnostics', 'Wiring repair', 'Alternator service', 'Starter replacement', 'Battery system service', 'Lighting repair'],
    'electrical-diagnostics',
    true,
    4
  ),
  (
    'Tire Service & Alignment',
    'tire-service-alignment',
    'Complete tire service including mounting, balancing, and alignment. We also provide tire repair, replacement, and rotation services for all heavy-duty vehicles.',
    'Complete tire service and wheel alignment',
    'circle',
    'Call for quote',
    '1-2 hours',
    ARRAY['Tire mounting and balancing', 'Wheel alignment', 'Tire repair', 'Tire replacement', 'Tire rotation', 'Pressure monitoring'],
    'tires-suspension',
    true,
    5
  ),
  (
    'Preventative Maintenance',
    'preventative-maintenance',
    'Comprehensive preventative maintenance programs to keep your truck running smoothly. Regular service schedules, inspections, and maintenance to prevent costly breakdowns.',
    'Comprehensive maintenance programs',
    'calendar',
    'Call for quote',
    '2-4 hours',
    ARRAY['Oil changes', 'Filter replacement', 'Fluid service', 'Inspection services', 'Belt and hose replacement', 'Lubrication service'],
    'preventative-maintenance',
    true,
    6
  ),
  (
    '24/7 Emergency Service',
    'emergency-service',
    'Round-the-clock emergency repair services. When your truck breaks down, we''re here to help get you back on the road quickly and safely.',
    '24/7 emergency repair',
    'phone',
    'Call for quote',
    'Varies',
    ARRAY['Emergency repairs', 'Roadside assistance', 'Jump starts', 'Tire changes', 'Fuel delivery'],
    'emergency-services',
    true,
    7
  ),
  (
    'Fleet Maintenance',
    'fleet-maintenance',
    'Specialized fleet maintenance programs for companies with multiple vehicles. Customized service schedules and volume discounts available.',
    'Specialized fleet maintenance programs',
    'truck',
    'Volume pricing',
    'Varies',
    ARRAY['Fleet inspections', 'Scheduled maintenance', 'Volume discounts', 'Custom service plans', 'Fleet reporting', 'Priority service'],
    'preventative-maintenance',
    false,
    8
  ),
  (
    'Suspension Repair',
    'suspension-repair',
    'Complete suspension system repair and replacement. We work on all types of heavy-duty suspensions including air ride, leaf spring, and coil spring systems.',
    'Complete suspension system repair',
    'layers',
    'Call for quote',
    '1-2 days',
    ARRAY['Shock replacement', 'Spring repair', 'Air bag service', 'Bushing replacement', 'Suspension alignment', 'System inspection'],
    'tires-suspension',
    false,
    9
  ),
  (
    'Cooling System Service',
    'cooling-system-service',
    'Complete cooling system service including radiator repair, water pump replacement, and system diagnostics. Prevent overheating and engine damage.',
    'Complete cooling system service',
    'thermometer',
    'Call for quote',
    '4-8 hours',
    ARRAY['Radiator repair', 'Water pump replacement', 'Thermostat service', 'Coolant flush', 'Hose replacement', 'System pressure test'],
    'engine-transmission',
    false,
    10
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_service_categories_slug ON service_categories(slug);
CREATE INDEX IF NOT EXISTS idx_service_categories_active ON service_categories(active);

-- Set up Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to active services
CREATE POLICY "Public read access to active services" ON services
  FOR SELECT USING (active = true);

CREATE POLICY "Public read access to active service categories" ON service_categories
  FOR SELECT USING (active = true);

-- Create policies for admin access (you'll need to set up proper auth later)
CREATE POLICY "Admin full access to services" ON services
  FOR ALL USING (true);

CREATE POLICY "Admin full access to service categories" ON service_categories
  FOR ALL USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
