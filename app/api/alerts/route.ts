import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url);
    
    // Get query parameters
    const familyCode = url.searchParams.get('familyCode');
    const radius = url.searchParams.get('radius') || '5'; // Default radius is 5km
    const limit = parseInt(url.searchParams.get('limit') || '10'); // Default limit is 10 alerts
    
    // If user is logged in, prioritize alerts for their family
    const alerts = await prisma.alert.findMany({
      where: {
        OR: [
          // Alerts for the user's family
          { familyId: session?.user?.familyCode || familyCode || undefined },
          // Public alerts (no specific family)
          { familyId: null }
        ],
        isResolved: false
      },
      include: {
        incident: {
          select: {
            id: true,
            type: true,
            location: true,
            description: true,
            createdAt: true,
            latitude: true,
            longitude: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    });
    
    return NextResponse.json({ 
      success: true, 
      alerts 
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch alerts' 
    }, { status: 500 });
  }
}
