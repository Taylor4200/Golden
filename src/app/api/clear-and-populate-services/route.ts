import { NextRequest, NextResponse } from 'next/server';
import { createService } from '@/lib/database';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // First, delete all existing services
    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

    if (deleteError) {
      console.error('Error deleting existing services:', deleteError);
      return NextResponse.json(
        { error: 'Failed to clear existing services' },
        { status: 500 }
      );
    }

    console.log('Cleared all existing services');

    // Your exact 13 services only
    const services = [
      {
        name: 'DOT Inspections',
        slug: 'dot-inspections',
        description: 'Comprehensive DOT inspections to ensure your truck meets all federal safety regulations. We perform thorough checks on brakes, lights, tires, and all safety systems.',
        shortDescription: 'Complete DOT inspections to keep your truck compliant with federal regulations.',
        icon: 'shield',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Complete brake system inspection',
          'Light and electrical system check',
          'Tire and wheel inspection',
          'Steering and suspension check',
          'Exhaust system inspection',
          'Documentation and certification'
        ],
        category: 'inspection',
        featured: true,
        active: true,
        sortOrder: 1
      },
      {
        name: 'PM Services',
        slug: 'pm-services',
        description: 'Preventive maintenance services to keep your truck running smoothly and avoid costly breakdowns. Regular PM services extend vehicle life and improve reliability.',
        shortDescription: 'Preventive maintenance to keep your truck running smoothly and avoid breakdowns.',
        icon: 'settings',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Oil and filter changes',
          'Fluid level checks',
          'Belt and hose inspection',
          'Battery testing',
          'Air filter replacement',
          'Lubrication of moving parts'
        ],
        category: 'maintenance',
        featured: true,
        active: true,
        sortOrder: 2
      },
      {
        name: 'Turbo Charger',
        slug: 'turbo-charger',
        description: 'Turbocharger repair and replacement services. We diagnose turbo issues, rebuild units, and install new turbos to restore engine power and efficiency.',
        shortDescription: 'Turbocharger repair, rebuild, and replacement services.',
        icon: 'wrench',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Turbo diagnosis and testing',
          'Turbo rebuild services',
          'New turbo installation',
          'Boost pressure testing',
          'Oil line inspection',
          'Warranty on all work'
        ],
        category: 'engine',
        featured: true,
        active: true,
        sortOrder: 3
      },
      {
        name: 'Tires',
        slug: 'tires',
        description: 'Complete tire services including mounting, balancing, alignment, and repair. We carry all major tire brands and sizes for heavy-duty trucks.',
        shortDescription: 'Tire mounting, balancing, alignment, and repair services.',
        icon: 'circle',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Tire mounting and balancing',
          'Wheel alignment',
          'Tire repair and patching',
          'Tire rotation',
          'Pressure monitoring',
          'Road hazard protection'
        ],
        category: 'tires',
        featured: false,
        active: true,
        sortOrder: 4
      },
      {
        name: 'Brakes',
        slug: 'brakes',
        description: 'Complete brake system services including pad replacement, rotor resurfacing, brake line repair, and ABS system diagnostics.',
        shortDescription: 'Complete brake system repair and maintenance services.',
        icon: 'alert-triangle',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Brake pad replacement',
          'Rotor resurfacing',
          'Brake line repair',
          'ABS system diagnostics',
          'Brake fluid service',
          'Emergency brake repair'
        ],
        category: 'brakes',
        featured: true,
        active: true,
        sortOrder: 5
      },
      {
        name: 'Cooling System Repairs',
        slug: 'cooling-system',
        description: 'Cooling system repair and maintenance including radiator service, water pump replacement, thermostat repair, and coolant system flush.',
        shortDescription: 'Cooling system repair and maintenance services.',
        icon: 'settings',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Radiator repair and replacement',
          'Water pump service',
          'Thermostat replacement',
          'Coolant system flush',
          'Hose inspection and replacement',
          'Fan clutch repair'
        ],
        category: 'engine',
        featured: false,
        active: true,
        sortOrder: 6
      },
      {
        name: 'After Treatment Repairs',
        slug: 'after-treatment',
        description: 'After-treatment system repair including DPF cleaning, SCR system service, DEF system repair, and emissions compliance maintenance.',
        shortDescription: 'After-treatment system repair and emissions compliance services.',
        icon: 'shield',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'DPF cleaning and repair',
          'SCR system service',
          'DEF system repair',
          'Emissions testing',
          'Sensor replacement',
          'System diagnostics'
        ],
        category: 'emissions',
        featured: false,
        active: true,
        sortOrder: 7
      },
      {
        name: 'Regen',
        slug: 'regen',
        description: 'Diesel particulate filter regeneration services including forced regen, manual regen, and regen system diagnostics.',
        shortDescription: 'Diesel particulate filter regeneration services.',
        icon: 'wrench',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Forced regeneration',
          'Manual regeneration',
          'Regen system diagnostics',
          'DPF pressure testing',
          'Temperature sensor check',
          'System cleaning'
        ],
        category: 'emissions',
        featured: false,
        active: true,
        sortOrder: 8
      },
      {
        name: 'Suspension / Air Bags / Shocks',
        slug: 'suspension',
        description: 'Complete suspension system repair including air bag replacement, shock absorber service, spring repair, and suspension alignment.',
        shortDescription: 'Suspension system repair including air bags and shocks.',
        icon: 'settings',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Air bag replacement',
          'Shock absorber service',
          'Spring repair',
          'Suspension alignment',
          'Bushings replacement',
          'Load leveling system'
        ],
        category: 'suspension',
        featured: false,
        active: true,
        sortOrder: 9
      },
      {
        name: 'Wheel Seals',
        slug: 'wheel-seals',
        description: 'Wheel seal replacement and hub service to prevent oil leaks and maintain proper wheel bearing lubrication.',
        shortDescription: 'Wheel seal replacement and hub service.',
        icon: 'circle',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Wheel seal replacement',
          'Hub service',
          'Bearing inspection',
          'Oil leak repair',
          'Seal installation',
          'Lubrication service'
        ],
        category: 'wheels',
        featured: false,
        active: true,
        sortOrder: 10
      },
      {
        name: 'Electrical',
        slug: 'electrical',
        description: 'Complete electrical system repair including wiring, alternator service, starter repair, and lighting system maintenance.',
        shortDescription: 'Complete electrical system repair and maintenance.',
        icon: 'wrench',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Wiring repair',
          'Alternator service',
          'Starter repair',
          'Lighting system',
          'Battery service',
          'Fuse and relay repair'
        ],
        category: 'electrical',
        featured: false,
        active: true,
        sortOrder: 11
      },
      {
        name: 'Cooling / Heating',
        slug: 'cooling-heating',
        description: 'HVAC system repair including air conditioning service, heater repair, and climate control system maintenance.',
        shortDescription: 'HVAC system repair and climate control maintenance.',
        icon: 'settings',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Air conditioning service',
          'Heater repair',
          'Climate control',
          'Blower motor service',
          'Refrigerant service',
          'System diagnostics'
        ],
        category: 'hvac',
        featured: false,
        active: true,
        sortOrder: 12
      },
      {
        name: 'Trailer Repair',
        slug: 'trailer-repair',
        description: 'Complete trailer repair services including brake service, lighting repair, suspension work, and structural maintenance.',
        shortDescription: 'Complete trailer repair and maintenance services.',
        icon: 'truck',
        priceRange: 'Quote by call',
        duration: 'Quote by call',
        features: [
          'Trailer brake service',
          'Lighting system repair',
          'Suspension work',
          'Structural repair',
          'Coupling service',
          'Safety inspection'
        ],
        category: 'trailer',
        featured: false,
        active: true,
        sortOrder: 13
      }
    ];

    const results = [];
    for (const service of services) {
      const result = await createService(service);
      results.push(result);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Cleared database and added exactly ${results.length} services`,
      services: results 
    });

  } catch (error) {
    console.error('Error clearing and populating services:', error);
    return NextResponse.json(
      { error: 'Failed to clear and populate services' },
      { status: 500 }
    );
  }
}
