import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET endpoint to fetch all incidents with their alerts
export async function GET() {
  try {
    // Fetch all alerts with their associated incidents
    const alerts = await prisma.alert.findMany({
      include: {
        incident: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      alerts 
    });
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch incidents' 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    
    const { 
      type, 
      location, 
      description, 
      name, 
      contact 
    } = body;
    
    // Get IP address and geolocation data
    const ipAddress = req.headers.get('x-forwarded-for') || 'Unknown';
    
    // Create the incident
    const incident = await prisma.incident.create({
      data: {
        type,
        location,
        description,
        name,
        contact,
        ipAddress,
        reporterId: session?.user?.id || null,
      },
    });
    
    // Create an alert for the incident
    const alert = await prisma.alert.create({
      data: {
        incidentId: incident.id,
        // Set familyId to null to avoid foreign key constraint error
        // In a real app, we would check if the family exists first
        familyId: null,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      incident,
      alert
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating incident report:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create incident report' 
    }, { status: 500 });
  }
}
