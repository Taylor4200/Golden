-- Step 1: Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;

-- Step 2: Create Blog Posts Table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  meta_description TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Golden Heavy Duty Team',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  read_time INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create Blog Categories Table
CREATE TABLE blog_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Insert default categories
INSERT INTO blog_categories (id, name, slug, description, icon) VALUES
('engine-transmission', 'Engine & Transmission', 'engine-transmission', 'Expert insights on diesel engines, transmissions, and powertrain systems', '🔧'),
('brakes-safety', 'Brakes & Safety', 'brakes-safety', 'Critical safety information for air brakes and heavy-duty braking systems', '🛑'),
('electrical-diagnostics', 'Electrical & Diagnostics', 'electrical-diagnostics', 'Electrical systems, diagnostics, and troubleshooting guides', '⚡'),
('tires-suspension', 'Tires, Suspension & Alignment', 'tires-suspension', 'Tire maintenance, suspension systems, and alignment services', '🛞'),
('preventative-maintenance', 'Preventative Maintenance', 'preventative-maintenance', 'Maintenance schedules, checklists, and cost-saving tips', '🛠');

-- Step 5: Insert sample blog posts (with shorter content for testing)
INSERT INTO blog_posts (id, title, slug, excerpt, meta_description, content, author, published_at, updated_at, category, tags, read_time, published) VALUES
(
  gen_random_uuid(),
  'How to Tell If Your Semi Truck Engine Is About to Fail',
  'how-to-tell-if-your-semi-truck-engine-is-about-to-fail',
  'Learn the critical warning signs that indicate your semi truck engine is failing before it leaves you stranded on the highway.',
  'Don''t wait until your engine quits on the open road. Learn the top warning signs that a semi-truck engine is failing, what they mean, and what maintenance steps you can take now to avoid costly breakdowns.',
  '# How to Tell If Your Semi Truck Engine Is About to Fail

Your semi truck engine is the heart of your operation. When it fails, you''re not just dealing with expensive repairs – you''re facing downtime that costs money every hour.

## Critical Warning Signs

### 1. Unusual Engine Noises
- **Knocking or Pinging Sounds**: Often indicates detonation, timing issues, or bearing problems
- **Grinding or Metal-on-Metal Sounds**: Bearings are failing or metal components are rubbing

### 2. Performance Issues
- **Loss of Power**: Gradual power loss often indicates fuel system problems
- **Poor Fuel Economy**: A 10-15% drop in fuel efficiency often precedes engine problems

### 3. Visual Warning Signs
- **Excessive Smoke**: Black, white, or blue smoke indicates different problems
- **Oil Consumption**: Normal is 1 quart per 1,000 miles

## When to Call Golden Heavy Duty

**Immediate Service Needed:**
- Any unusual noises during operation
- Temperature above 220°F
- Oil pressure below 20 PSI
- Excessive smoke of any color

**Need expert help in Hudson, CO? Call Golden Heavy Duty Truck Repair today at (303) 304-9993 for immediate assistance.**

---
*Golden Heavy Duty Truck Repair | 806 Cedar St, Hudson, CO 80642 | Serving Colorado''s truckers 24/7*',
  'Golden Heavy Duty Team',
  '2024-01-15T10:00:00Z',
  '2024-01-15T10:00:00Z',
  'engine-transmission',
  ARRAY['engine', 'diagnostics', 'maintenance', 'troubleshooting'],
  8,
  true
),
(
  gen_random_uuid(),
  'Air Brake Failures in Big Rigs: Warning Signs Every Driver Should Know',
  'air-brake-failures-in-big-rigs-warning-signs-every-driver-should-know',
  'Critical safety information about air brake system failures that every commercial driver needs to know to stay safe on the road.',
  'Critical safety information about air brake system failures that every commercial driver needs to know to stay safe on the road. Learn warning signs, emergency procedures, and maintenance tips.',
  '# Air Brake Failures in Big Rigs: Warning Signs Every Driver Should Know

Air brake systems are the most critical safety component on your semi truck. When they fail, the consequences can be catastrophic.

## Understanding Your Air Brake System

### Key Components
- **Air compressor**: Builds and maintains air pressure
- **Air tanks**: Store compressed air for brake operation
- **Brake chambers**: Convert air pressure to mechanical force
- **Brake shoes and drums**: Create friction to stop the vehicle

### Normal Operating Pressure
- **Build-up pressure**: 90-120 PSI
- **Cut-out pressure**: 120-140 PSI
- **Warning buzzer**: Activates below 60 PSI

## Critical Warning Signs

### 1. Pressure Gauge Issues
- **Slow Pressure Build-up**: Should reach 90 PSI within 3 minutes
- **Pressure Drops While Driving**: Warning if drops more than 20 PSI

### 2. Audible Warning Signs
- **Air Leak Sounds**: Hissing sounds indicate air leaks
- **Brake Squealing or Grinding**: Indicates worn brake shoes

### 3. Physical Warning Signs
- **Soft or Spongy Brake Pedal**: Reduced braking effectiveness
- **Brake Pulling to One Side**: Loss of vehicle control

## Emergency Procedures

### If Brakes Fail While Driving
1. **Stay calm** and don''t panic
2. **Downshift** to use engine braking
3. **Use parking brake** gradually
4. **Look for escape routes**
5. **Call emergency services** immediately

**Need expert brake service in Hudson, CO? Call Golden Heavy Duty Truck Repair today at (303) 304-9993 for immediate assistance.**

---
*Golden Heavy Duty Truck Repair | 806 Cedar St, Hudson, CO 80642 | Serving Colorado''s truckers 24/7*',
  'Golden Heavy Duty Team',
  '2024-01-20T10:00:00Z',
  '2024-01-20T10:00:00Z',
  'brakes-safety',
  ARRAY['brakes', 'safety', 'air-brakes', 'maintenance'],
  10,
  true
),
(
  gen_random_uuid(),
  'Semi Truck Preventative Maintenance Checklist (Free Download)',
  'semi-truck-preventative-maintenance-checklist-free-download',
  'Download our comprehensive preventative maintenance checklist to keep your semi truck running smoothly and avoid costly breakdowns.',
  'Download our comprehensive preventative maintenance checklist to keep your semi truck running smoothly and avoid costly breakdowns. Daily, weekly, monthly, and seasonal maintenance schedules.',
  '# Semi Truck Preventative Maintenance Checklist (Free Download)

Preventative maintenance is the key to keeping your semi truck on the road and your repair costs down.

## Why Preventative Maintenance Matters

### Cost Savings
- **Preventive maintenance**: $0.10-0.15 per mile
- **Reactive repairs**: $0.25-0.50 per mile
- **Emergency repairs**: $0.75-1.50 per mile

### Safety Benefits
- Reduces risk of roadside breakdowns
- Prevents accidents caused by equipment failure
- Ensures DOT compliance

## Daily Pre-Trip Inspection Checklist

### Engine Compartment
- [ ] **Oil level** - Check dipstick, add if needed
- [ ] **Coolant level** - Check reservoir, top off if needed
- [ ] **Battery connections** - Clean and tight
- [ ] **Belts and hoses** - No cracks, proper tension

### Air System
- [ ] **Air pressure** - 90-120 PSI on gauges
- [ ] **Air leaks** - No hissing sounds
- [ ] **Brake application** - Smooth, firm engagement

### Tires and Wheels
- [ ] **Tire pressure** - Check all tires
- [ ] **Tire condition** - No cuts, bulges, or excessive wear
- [ ] **Tread depth** - Minimum 4/32" on steer tires

## Professional Service Intervals

### Every 15,000 Miles
- Oil and filter change
- Fuel filter replacement
- Air filter inspection
- Brake inspection

### Every 30,000 Miles
- Complete brake service
- Transmission service
- Differential service
- Cooling system service

**Need professional maintenance service in Hudson, CO? Call Golden Heavy Duty Truck Repair today at (303) 304-9993 to schedule your next maintenance appointment.**

---
*Golden Heavy Duty Truck Repair | 806 Cedar St, Hudson, CO 80642 | Serving Colorado''s truckers 24/7*',
  'Golden Heavy Duty Team',
  '2024-01-25T10:00:00Z',
  '2024-01-25T10:00:00Z',
  'preventative-maintenance',
  ARRAY['maintenance', 'checklist', 'preventive', 'schedule'],
  12,
  true
);

-- Step 6: Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);

-- Step 7: Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Step 8: Create policies (allow public read access, admin write access)
CREATE POLICY "Allow public read access to blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access to blog_categories" ON blog_categories FOR SELECT USING (true);

-- Admin policies (you'll need to create an admin role)
CREATE POLICY "Allow admin full access to blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Allow admin full access to blog_categories" ON blog_categories FOR ALL USING (auth.role() = 'admin');