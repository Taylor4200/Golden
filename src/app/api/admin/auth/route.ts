import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Get credentials from environment variables (server-side)
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Check if environment variables are set
    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials not configured in environment variables');
      return NextResponse.json({ success: false, error: 'Admin credentials not configured' }, { status: 500 });
    }
    
    // Validate credentials
    if (username === adminUsername && password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
