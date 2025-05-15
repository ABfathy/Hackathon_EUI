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
    const radius = parseFloat(url.searchParams.get('radius') || '5'); // Default radius is 5km
    const limit = parseInt(url.searchParams.get('limit') || '10'); // Default limit is 10 alerts
    
    // Get location coordinates if provided
    const userLatitude = url.searchParams.get('latitude') ? parseFloat(url.searchParams.get('latitude')!) : null;
    const userLongitude = url.searchParams.get('longitude') ? parseFloat(url.searchParams.get('longitude')!) : null;
    
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
    
    // Filter alerts based on user location if coordinates are provided
    let filteredAlerts = alerts;
    
    if (userLatitude !== null && userLongitude !== null) {
      filteredAlerts = alerts.filter(alert => {
        // Skip if the incident doesn't have coordinates
        if (!alert.incident.latitude || !alert.incident.longitude) {
          return false;
        }
        
        // Calculate distance between user and incident (haversine formula)
        const incidentLat = parseFloat(alert.incident.latitude);
        const incidentLng = parseFloat(alert.incident.longitude);
        
        // Skip if the incident has invalid coordinates
        if (isNaN(incidentLat) || isNaN(incidentLng)) {
          return false;
        }
        
        // Earth's radius in kilometers
        const R = 6371;
        
        // Convert latitude and longitude from degrees to radians
        const lat1Rad = userLatitude * (Math.PI / 180);
        const lat2Rad = incidentLat * (Math.PI / 180);
        const latDiffRad = (incidentLat - userLatitude) * (Math.PI / 180);
        const lngDiffRad = (incidentLng - userLongitude) * (Math.PI / 180);
        
        // Haversine formula
        const a = 
          Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) * 
          Math.sin(lngDiffRad / 2) * Math.sin(lngDiffRad / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        
        // Return true if the incident is within the specified radius
        return distance <= radius;
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      alerts: filteredAlerts 
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch alerts' 
    }, { status: 500 });
  }
}
