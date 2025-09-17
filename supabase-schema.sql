-- Supabase Database Schema for Golden Heavy Duty Admin Panel
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Golden Heavy Duty Team',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  category TEXT NOT NULL DEFAULT 'engine-transmission',
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO admin_users (email, username) 
VALUES ('admin@goldenheavyduty.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'Golden Heavy Duty Truck Repair'),
  ('site_description', 'Professional heavy-duty truck repair services in Hudson, CO'),
  ('contact_email', 'info@goldenheavyduty.com'),
  ('contact_phone', '(303) 304-9993'),
  ('address', '806 Cedar St, Hudson, CO 80642'),
  ('business_hours', 'Mon-Fri: 7AM-6PM, Sat: 8AM-4PM, 24/7 Emergency'),
  ('admin_email', 'admin@goldenheavyduty.com'),
  ('notifications_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, read_time, published) VALUES
  (
    'How to Tell If Your Semi Truck Engine Is About to Fail',
    'how-to-tell-if-your-semi-truck-engine-is-about-to-fail',
    'Learn the critical warning signs that indicate your semi truck engine is failing before it leaves you stranded on the highway.',
    '# How to Tell If Your Semi Truck Engine Is About to Fail

Your semi truck engine is the heart of your operation. When it fails, you''re not just dealing with expensive repairs – you''re facing downtime that costs money every hour. At Golden Heavy Duty Truck Repair in Hudson, CO, we''ve seen every type of engine failure imaginable. Here are the warning signs that indicate your engine is about to fail, and what you can do about it.

## Critical Warning Signs

### 1. Unusual Engine Noises

**Knocking or Pinging Sounds**
- **What it means**: Often indicates detonation, timing issues, or bearing problems
- **Action needed**: Immediate inspection of fuel system and timing
- **Cost if ignored**: $5,000-$15,000 for major engine rebuild

**Grinding or Metal-on-Metal Sounds**
- **What it means**: Bearings are failing or metal components are rubbing
- **Action needed**: Stop driving immediately and call for service
- **Cost if ignored**: Complete engine failure requiring replacement

### 2. Performance Issues

**Loss of Power**
- Gradual power loss often indicates fuel system problems
- Sudden power loss could mean turbo failure or major component failure
- **Test**: Note if you need more throttle for the same speed/load

**Poor Fuel Economy**
- A 10-15% drop in fuel efficiency often precedes engine problems
- **Monitor**: Track fuel consumption over time
- **Cause**: Often related to injector problems or compression loss

## When to Call Golden Heavy Duty

**Immediate Service Needed:**
- Any unusual noises during operation
- Temperature above 220°F
- Oil pressure below 20 PSI
- Excessive smoke of any color
- Loss of power or rough running

**Schedule Service Within 24 Hours:**
- Gradual power loss
- Poor fuel economy
- Oil consumption above normal
- Temperature consistently above 210°F

## The Golden Heavy Duty Advantage

Located at 806 Cedar St in Hudson, CO, we specialize in heavy-duty truck engine diagnostics and repair. Our experienced technicians use state-of-the-art diagnostic equipment to identify problems before they become catastrophic failures.

**Why Choose Golden Heavy Duty:**
- **24/7 Emergency Service**: We understand downtime costs money
- **Experienced Technicians**: Over 5 years of heavy-duty experience
- **Quality Parts**: OEM and premium aftermarket parts
- **Warranty Coverage**: Comprehensive warranty on all repairs
- **Fast Turnaround**: Get back on the road quickly

## Don''t Wait Until It''s Too Late

Engine failures don''t happen overnight. They develop over time, and the warning signs are there if you know what to look for. Regular maintenance and early intervention can save you thousands of dollars and prevent dangerous roadside breakdowns.

**Need expert help in Hudson, CO? Call Golden Heavy Duty Truck Repair today at (303) 304-9993 for immediate assistance or to schedule a comprehensive engine inspection.**

---

*Golden Heavy Duty Truck Repair | 806 Cedar St, Hudson, CO 80642 | Serving Colorado''s truckers 24/7*',
    'Golden Heavy Duty Team',
    'engine-transmission',
    ARRAY['engine', 'diagnostics', 'maintenance', 'troubleshooting'],
    8,
    true
  ),
  (
    'Air Brake Failures in Big Rigs: Warning Signs Every Driver Should Know',
    'air-brake-failures-in-big-rigs-warning-signs-every-driver-should-know',
    'Critical safety information about air brake system failures that every commercial driver needs to know to stay safe on the road.',
    '# Air Brake Failures in Big Rigs: Warning Signs Every Driver Should Know

Air brake systems are the most critical safety component on your semi truck. When they fail, the consequences can be catastrophic. At Golden Heavy Duty Truck Repair, we''ve seen too many preventable accidents caused by brake system failures. Here''s what every driver needs to know about air brake warning signs and when to seek immediate service.

## Understanding Your Air Brake System

### Key Components
- **Air compressor**: Builds and maintains air pressure
- **Air tanks**: Store compressed air for brake operation
- **Brake chambers**: Convert air pressure to mechanical force
- **Brake shoes and drums**: Create friction to stop the vehicle
- **ABS system**: Prevents wheel lockup during hard braking

### Normal Operating Pressure
- **Build-up pressure**: 90-120 PSI
- **Cut-out pressure**: 120-140 PSI
- **Cut-in pressure**: 100-110 PSI
- **Warning buzzer**: Activates below 60 PSI

## Critical Warning Signs

### 1. Pressure Gauge Issues

**Slow Pressure Build-up**
- **Normal**: Should reach 90 PSI within 3 minutes
- **Warning**: Takes longer than 5 minutes
- **Cause**: Compressor problems, air leaks, or restricted air lines
- **Action**: Immediate inspection needed

**Pressure Drops While Driving**
- **Normal**: Slight pressure drop during heavy braking
- **Warning**: Pressure drops more than 20 PSI during normal operation
- **Critical**: Pressure drops below 60 PSI
- **Action**: Stop immediately and call for service

## Daily Pre-Trip Inspection Checklist

### Air System Checks
1. **Check air pressure gauges** - Should read 90-120 PSI
2. **Listen for air leaks** - No hissing sounds should be heard
3. **Test brake application** - Should engage smoothly and firmly
4. **Check air pressure build-up** - Should reach 90 PSI within 3 minutes
5. **Test low air pressure warning** - Buzzer should sound below 60 PSI

## Golden Heavy Duty Brake Services

Located at 806 Cedar St in Hudson, CO, we specialize in heavy-duty brake system repair and maintenance. Our certified technicians understand the critical importance of brake system reliability.

**Our Brake Services Include:**
- **Emergency brake repair** - 24/7 service available
- **Complete brake overhauls** - Full system replacement
- **Air system diagnostics** - Computerized leak detection
- **ABS system repair** - Certified ABS technicians
- **DOT compliance inspections** - Pass your inspections

**Why Choose Golden Heavy Duty:**
- **Certified technicians** with heavy-duty brake experience
- **Quality parts** - OEM and premium aftermarket
- **Fast turnaround** - Get back on the road quickly
- **Comprehensive warranty** - Peace of mind on all repairs
- **24/7 emergency service** - When you need us most

## Don''t Risk Your Safety

Air brake failures are not just expensive – they''re dangerous. Regular maintenance and early intervention can prevent catastrophic failures and keep you safe on the road.

**Need expert brake service in Hudson, CO? Call Golden Heavy Duty Truck Repair today at (303) 304-9993 for immediate assistance or to schedule a comprehensive brake inspection.**

---

*Golden Heavy Duty Truck Repair | 806 Cedar St, Hudson, CO 80642 | Serving Colorado''s truckers 24/7*',
    'Golden Heavy Duty Team',
    'brakes-safety',
    ARRAY['brakes', 'safety', 'air-brakes', 'maintenance'],
    10,
    true
  ),
  (
    'Semi Truck Preventative Maintenance Checklist (Free Download)',
    'semi-truck-preventative-maintenance-checklist-free-download',
    'Download our comprehensive preventative maintenance checklist to keep your semi truck running smoothly and avoid costly breakdowns.',
    '# Semi Truck Preventative Maintenance Checklist (Free Download)

Preventative maintenance is the key to keeping your semi truck on the road and your repair costs down. At Golden Heavy Duty Truck Repair in Hudson, CO, we''ve developed this comprehensive checklist based on over 5 years of experience servicing heavy-duty trucks. Use this checklist to stay ahead of problems and keep your rig running smoothly.

## Why Preventative Maintenance Matters

### Cost Savings
- **Preventive maintenance**: $0.10-0.15 per mile
- **Reactive repairs**: $0.25-0.50 per mile
- **Emergency repairs**: $0.75-1.50 per mile

### Safety Benefits
- Reduces risk of roadside breakdowns
- Prevents accidents caused by equipment failure
- Ensures DOT compliance
- Protects your CDL and driving record

### Operational Benefits
- Maximizes uptime and revenue
- Improves fuel efficiency
- Extends equipment life
- Maintains resale value

## Daily Pre-Trip Inspection Checklist

### Engine Compartment
- [ ] **Oil level** - Check dipstick, add if needed
- [ ] **Coolant level** - Check reservoir, top off if needed
- [ ] **Power steering fluid** - Check level and condition
- [ ] **Battery connections** - Clean and tight
- [ ] **Belts and hoses** - No cracks, proper tension
- [ ] **Air filter** - Clean, no excessive dirt
- [ ] **Fuel filter** - No water or contamination
- [ ] **Engine oil leaks** - No visible leaks

### Air System
- [ ] **Air pressure** - 90-120 PSI on gauges
- [ ] **Air leaks** - No hissing sounds
- [ ] **Air tanks** - Drain moisture if needed
- [ ] **Brake application** - Smooth, firm engagement
- [ ] **Parking brake** - Holds vehicle securely

## Golden Heavy Duty Maintenance Services

Located at 806 Cedar St in Hudson, CO, we offer comprehensive maintenance services to keep your truck running smoothly.

**Our Maintenance Services:**
- **Scheduled maintenance** - Follow manufacturer recommendations
- **Preventive maintenance** - Catch problems before they become expensive
- **Emergency repairs** - 24/7 service when you need it most
- **Fleet maintenance** - Specialized programs for multiple trucks
- **Maintenance contracts** - Predictable costs and service

**Why Choose Golden Heavy Duty:**
- **Experienced technicians** - Over 5 years of heavy-duty experience
- **Quality parts** - OEM and premium aftermarket
- **Fast turnaround** - Minimize your downtime
- **Comprehensive warranty** - Peace of mind on all work
- **24/7 emergency service** - When you need us most

## Download Your Free Checklist

Keep this checklist handy and use it regularly to maintain your semi truck. Regular maintenance is the best way to prevent costly breakdowns and keep your truck on the road.

**Need professional maintenance service in Hudson, CO? Call Golden Heavy Duty Truck Repair today at (303) 304-9993 to schedule your next maintenance appointment.**

---

*Golden Heavy Duty Truck Repair | 806 Cedar St, Hudson, CO 80642 | Serving Colorado''s truckers 24/7*',
    'Golden Heavy Duty Team',
    'preventative-maintenance',
    ARRAY['maintenance', 'checklist', 'preventive', 'schedule'],
    12,
    true
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- Set up Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to blog posts
CREATE POLICY "Public read access to published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Create policies for admin access (you'll need to set up proper auth later)
CREATE POLICY "Admin full access to blog posts" ON blog_posts
  FOR ALL USING (true);

CREATE POLICY "Admin full access to site settings" ON site_settings
  FOR ALL USING (true);

CREATE POLICY "Admin full access to admin users" ON admin_users
  FOR ALL USING (true);
