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

-- Step 5: Insert sample blog posts
INSERT INTO blog_posts (id, title, slug, excerpt, meta_description, content, author, published_at, updated_at, category, tags, read_time, published) VALUES
(
  gen_random_uuid(),
  'How to Tell If Your Semi Truck Engine Is About to Fail',
  'how-to-tell-if-your-semi-truck-engine-is-about-to-fail',
  'Learn the critical warning signs that indicate your semi truck engine is failing before it leaves you stranded on the highway.',
  'Don''t wait until your engine quits on the open road. Learn the top warning signs that a semi-truck engine is failing, what they mean, and what maintenance steps you can take now to avoid costly breakdowns.',
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

### 3. Visual Warning Signs

**Excessive Smoke**
- **Black smoke**: Over-fueling, injector problems, or air filter issues
- **White smoke**: Coolant leak, head gasket failure, or injector problems
- **Blue smoke**: Oil burning, often indicates worn rings or valve guides

**Oil Consumption**
- Normal: 1 quart per 1,000 miles
- **Warning**: More than 1 quart per 500 miles
- **Critical**: More than 1 quart per 200 miles

### 4. Temperature and Pressure Issues

**Overheating**
- **Normal operating temp**: 190-210°F
- **Warning signs**: Temperature gauge consistently above 210°F
- **Causes**: Coolant leaks, thermostat failure, water pump issues

**Oil Pressure Problems**
- **Normal**: 40-60 PSI at operating temperature
- **Warning**: Pressure below 20 PSI at idle
- **Critical**: Pressure below 10 PSI at any time

## Diagnostic Steps You Can Take

### Daily Checks
1. **Visual inspection** of engine bay for leaks
2. **Check oil level** and condition
3. **Monitor temperature gauge** during operation
4. **Listen for unusual sounds** during startup and operation

### Weekly Checks
1. **Check coolant level** and condition
2. **Inspect air filter** for excessive dirt
3. **Monitor fuel consumption** patterns
4. **Check for oil leaks** under the truck

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

## Prevention is Key

**Regular Maintenance Schedule:**
- **Oil changes**: Every 15,000-25,000 miles (depending on oil type)
- **Fuel filter changes**: Every 15,000 miles
- **Air filter inspection**: Every 10,000 miles
- **Coolant service**: Every 2 years or 100,000 miles

**Professional Inspections:**
- **Annual engine inspection**: Comprehensive check of all systems
- **Pre-trip inspections**: Daily checks before hitting the road
- **Seasonal maintenance**: Special attention before winter/summer

## The Golden Heavy Duty Advantage

Located at 806 Cedar St in Hudson, CO, we specialize in heavy-duty truck engine diagnostics and repair. Our experienced technicians use state-of-the-art diagnostic equipment to identify problems before they become catastrophic failures.

**Why Choose Golden Heavy Duty:**
- **24/7 Emergency Road Service**: We understand downtime costs money
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

### 2. Audible Warning Signs

**Air Leak Sounds**
- **Hissing sounds**: Indicates air leaks in the system
- **Location**: Check around brake chambers, air lines, and fittings
- **Severity**: Even small leaks can lead to brake failure
- **Action**: Professional inspection required

**Brake Squealing or Grinding**
- **Squealing**: Often indicates worn brake shoes
- **Grinding**: Metal-on-metal contact, immediate attention needed
- **Action**: Schedule brake service immediately

### 3. Physical Warning Signs

**Soft or Spongy Brake Pedal**
- **Cause**: Air in the hydraulic system or low air pressure
- **Danger**: Reduced braking effectiveness
- **Action**: Professional service required

**Brake Pulling to One Side**
- **Cause**: Uneven brake adjustment or component failure
- **Danger**: Loss of vehicle control
- **Action**: Immediate service needed

**Excessive Brake Travel**
- **Normal**: Brake pedal should engage within first 1/3 of travel
- **Warning**: Pedal travels more than halfway before engaging
- **Cause**: Worn brake shoes or adjustment issues

### 4. Dashboard Warning Lights

**ABS Warning Light**
- **Meaning**: Anti-lock brake system malfunction
- **Impact**: Loss of ABS protection during hard braking
- **Action**: Professional diagnosis required

**Air Pressure Warning Light**
- **Meaning**: Air pressure below safe operating level
- **Action**: Stop immediately and build air pressure
- **If pressure won''t build**: Call for emergency service

## Daily Pre-Trip Inspection Checklist

### Air System Checks
1. **Check air pressure gauges** - Should read 90-120 PSI
2. **Listen for air leaks** - No hissing sounds should be heard
3. **Test brake application** - Should engage smoothly and firmly
4. **Check air pressure build-up** - Should reach 90 PSI within 3 minutes
5. **Test low air pressure warning** - Buzzer should sound below 60 PSI

### Visual Inspections
1. **Check brake chambers** - No visible damage or leaks
2. **Inspect air lines** - No cracks, cuts, or abrasions
3. **Check brake shoes** - Should have adequate lining thickness
4. **Inspect brake drums** - No cracks or excessive wear
5. **Check slack adjusters** - Proper adjustment and no damage

## Emergency Procedures

### If Brakes Fail While Driving
1. **Stay calm** and don''t panic
2. **Downshift** to use engine braking
3. **Use parking brake** gradually (not all at once)
4. **Look for escape routes** - runaway truck ramps or safe areas
5. **Use horn** to warn other drivers
6. **Call emergency services** immediately

### If Air Pressure Won''t Build
1. **Stop immediately** in a safe location
2. **Check for obvious air leaks**
3. **Don''t attempt to drive** with low air pressure
4. **Call for emergency service** - (303) 304-9993

## Maintenance Schedule

### Daily Maintenance
- Pre-trip inspection of entire brake system
- Check air pressure and listen for leaks
- Test brake application and release

### Weekly Maintenance
- Thorough visual inspection of all brake components
- Check brake shoe lining thickness
- Inspect air lines and fittings

### Monthly Maintenance
- Professional brake adjustment
- Air system leak test
- ABS system diagnostic check

### Annual Maintenance
- Complete brake system overhaul
- Air tank inspection and cleaning
- Brake chamber replacement if needed

## The Cost of Neglect

**Minor Issues (if caught early):**
- Brake adjustment: $150-300
- Air line replacement: $100-200
- Brake shoe replacement: $300-500

**Major Issues (if ignored):**
- Complete brake system overhaul: $2,000-5,000
- Accident costs: Potentially millions in liability
- DOT violations: Fines up to $10,000
- Out-of-service orders: Lost revenue and reputation

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

### Electrical System
- [ ] **Battery voltage** - 12.6V or higher
- [ ] **Alternator output** - 13.5-14.5V while running
- [ ] **Lights** - All working properly
- [ ] **Turn signals** - Functioning correctly
- [ ] **Horn** - Loud and clear
- [ ] **Wipers** - Clean windshield effectively

### Tires and Wheels
- [ ] **Tire pressure** - Check all tires
- [ ] **Tire condition** - No cuts, bulges, or excessive wear
- [ ] **Tread depth** - Minimum 4/32" on steer tires
- [ ] **Wheel nuts** - Tight and properly torqued
- [ ] **Lug nut indicators** - All in place
- [ ] **Spare tire** - Properly inflated and accessible

### Brake System
- [ ] **Brake shoes** - Adequate lining thickness
- [ ] **Brake drums** - No cracks or excessive wear
- [ ] **Brake chambers** - No damage or leaks
- [ ] **Air lines** - No cracks or abrasions
- [ ] **Slack adjusters** - Proper adjustment
- [ ] **ABS system** - No warning lights

### Suspension and Steering
- [ ] **Shock absorbers** - No leaks or damage
- [ ] **Springs** - No broken or sagging springs
- [ ] **Steering linkage** - No excessive play
- [ ] **Kingpins** - Proper lubrication
- [ ] **U-joints** - No excessive play or wear

## Weekly Maintenance Checklist

### Engine
- [ ] **Oil analysis** - Send sample for testing
- [ ] **Fuel filter** - Replace if needed
- [ ] **Air filter** - Clean or replace
- [ ] **Coolant test** - Check freeze protection
- [ ] **Belt tension** - Adjust if needed

### Transmission
- [ ] **Fluid level** - Check and top off
- [ ] **Fluid condition** - Clean, no burnt smell
- [ ] **Shift linkage** - Smooth operation
- [ ] **Clutch adjustment** - Proper free play

### Differential
- [ ] **Fluid level** - Check and top off
- [ ] **Fluid condition** - Clean, no metal particles
- [ ] **Breather** - Clean and functioning
- [ ] **Seals** - No leaks

### Brake System
- [ ] **Brake adjustment** - Check all wheels
- [ ] **Air system leak test** - Professional inspection
- [ ] **Brake shoe lining** - Measure thickness
- [ ] **Brake drum condition** - Check for cracks

## Monthly Maintenance Checklist

### Engine
- [ ] **Oil change** - If due (15,000-25,000 miles)
- [ ] **Fuel filter replacement** - Primary and secondary
- [ ] **Air filter replacement** - If needed
- [ ] **Coolant service** - Test and replace if needed
- [ ] **Belt replacement** - If showing wear

### Transmission
- [ ] **Fluid change** - If due (50,000-100,000 miles)
- [ ] **Filter replacement** - If applicable
- [ ] **Shift cable adjustment** - Smooth operation
- [ ] **Mount inspection** - No cracks or damage

### Differential
- [ ] **Fluid change** - If due (50,000-100,000 miles)
- [ ] **Bearing inspection** - Check for play
- [ ] **Seal replacement** - If leaking
- [ ] **Breather replacement** - If clogged

### Brake System
- [ ] **Complete brake inspection** - Professional service
- [ ] **Brake shoe replacement** - If needed
- [ ] **Brake drum turning** - If needed
- [ ] **Air system service** - Professional inspection

## Seasonal Maintenance

### Spring (March-May)
- [ ] **Winter damage inspection** - Check for salt damage
- [ ] **Cooling system service** - Prepare for summer
- [ ] **Air conditioning check** - Ensure proper operation
- [ ] **Tire rotation** - Even out wear patterns

### Summer (June-August)
- [ ] **Cooling system inspection** - Check for leaks
- [ ] **Air conditioning service** - Clean and recharge
- [ ] **Tire pressure monitoring** - Hot weather adjustments
- [ ] **Battery testing** - Heat stress check

### Fall (September-November)
- [ ] **Winter preparation** - Antifreeze check
- [ ] **Heating system check** - Defrost and heat
- [ ] **Battery testing** - Cold weather performance
- [ ] **Tire inspection** - Winter driving preparation

### Winter (December-February)
- [ ] **Cold weather checks** - Daily inspections
- [ ] **Battery maintenance** - Keep charged
- [ ] **Fuel system** - Add anti-gel if needed
- [ ] **Tire chains** - Inspect and repair

## Professional Service Intervals

### Every 15,000 Miles
- Oil and filter change
- Fuel filter replacement
- Air filter inspection
- Brake inspection
- Tire rotation

### Every 30,000 Miles
- Complete brake service
- Transmission service
- Differential service
- Cooling system service
- Electrical system check

### Every 60,000 Miles
- Complete engine inspection
- Transmission overhaul (if needed)
- Differential overhaul (if needed)
- Suspension overhaul (if needed)
- Complete electrical system check

### Every 100,000 Miles
- Complete vehicle inspection
- Engine overhaul (if needed)
- Transmission rebuild (if needed)
- Complete brake system overhaul
- Complete electrical system overhaul

## Maintenance Record Keeping

### What to Record
- Date and mileage of each service
- Parts replaced and part numbers
- Service performed and by whom
- Next service due date and mileage
- Any problems found or repairs needed

### Record Keeping Methods
- **Paper logbook** - Simple and reliable
- **Digital spreadsheet** - Easy to search and sort
- **Maintenance software** - Professional fleet management
- **Mobile apps** - Convenient and always available

## Cost Tracking

### Maintenance Costs to Track
- **Labor costs** - Hourly rates and time spent
- **Parts costs** - Individual part prices
- **Fluid costs** - Oil, coolant, transmission fluid
- **Filter costs** - Air, fuel, oil filters
- **Tire costs** - Replacement and rotation

### Cost Analysis
- **Cost per mile** - Total maintenance cost ÷ miles driven
- **Cost by category** - Engine, transmission, brakes, etc.
- **Cost trends** - Increasing or decreasing over time
- **Budget planning** - Forecast future maintenance needs

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
