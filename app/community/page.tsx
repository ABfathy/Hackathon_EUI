'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Bell, Video, FileText, Users, Search, Calendar, ExternalLink, ChevronDown, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import SafetyMap from "@/components/safety-map"
import { useState, useEffect, useRef } from "react"

const translations = {
  en: {
    title: "Community Awareness",
    subtitle: "Stay informed with local alerts and community awareness campaigns.",
    searchPlaceholder: "Search by location or keyword...",
    notifications: "Notifications",
    localAlertsMap: "Local Alerts Map",
    educationCampaigns: "Education Campaigns",
    communityEvents: "Community Events",
    interactiveSafetyMap: "Interactive Safety Map",
    mapDescription: "View alerts and safety information in your area",
    mapPlaceholder: "Interactive map showing alerts on known incidents and safety concerns in your area.",
    mapDataPlaceholder: "Map data would be displayed here",
    recentAlerts: "Recent Alerts in Your Area",
    centralPark: "Central Park Area",
    highRisk: "High Risk",
    suspiciousActivity: "Multiple reports of suspicious activity near playground",
    downtownShopping: "Downtown Shopping Center",
    mediumRisk: "Medium Risk",
    approachingMinors: "Reports of individuals approaching unaccompanied minors",
    riversideSchool: "Riverside Elementary School",
    safeZone: "Safe Zone",
    increasedSecurity: "Increased security and safety measures implemented",
    filterAlerts: "Filter Alerts",
    reportNewConcern: "Report New Concern",
    knowTheSigns: "Know the Signs",
    active: "Active",
    signsDescription: "Educational campaign on recognizing abuse signs",
    signsContent: "This campaign provides educational materials to help community members recognize the signs of child abuse and neglect.",
    materials: "Materials",
    joinCampaign: "Join Campaign",
    safeSchools: "Safe Schools Initiative",
    schoolsDescription: "Creating safer educational environments",
    schoolsContent: "A collaborative effort between schools, parents, and community organizations to enhance safety in educational settings.",
    digitalSafety: "Digital Safety for Families",
    comingSoon: "Coming Soon",
    digitalDescription: "Protecting children in the digital world",
    digitalContent: "Launching next month, this campaign will focus on online safety, cyberbullying prevention, and responsible digital citizenship.",
    getNotified: "Get Notified",
    becomeAmbassador: "Become a Community Ambassador",
    ambassadorDescription: "Help spread awareness by becoming a SafeGuard community ambassador. Receive training and resources to educate others.",
    applyNow: "Apply Now",
    upcomingEvents: "Upcoming Community Events",
    eventsDescription: "Join local events focused on child safety and protection",
    childSafetyWorkshop: "Child Safety Workshop",
    communityCenter: "Community Center, 10:00 AM - 2:00 PM",
    workshop: "Workshop",
    free: "Free",
    register: "Register"
  },
  ar: {
    title: "التوعية المجتمعية",
    subtitle: "ابق على اطلاع بآخر التنبيهات المحلية وحملات التوعية المجتمعية.",
    searchPlaceholder: "البحث حسب الموقع أو الكلمة المفتاحية...",
    notifications: "الإشعارات",
    localAlertsMap: "خريطة التنبيهات المحلية",
    educationCampaigns: "الحملات التعليمية",
    communityEvents: "الفعاليات المجتمعية",
    interactiveSafetyMap: "خريطة السلامة التفاعلية",
    mapDescription: "عرض التنبيهات ومعلومات السلامة في منطقتك",
    mapPlaceholder: "خريطة تفاعلية تعرض التنبيهات المتعلقة بالحوادث المعروفة ومخاوف السلامة في منطقتك.",
    mapDataPlaceholder: "سيتم عرض بيانات الخريطة هنا",
    recentAlerts: "التنبيهات الأخيرة في منطقتك",
    centralPark: "منطقة سنترال بارك",
    highRisk: "مخاطر عالية",
    suspiciousActivity: "تقارير متعددة عن نشاط مشبوه بالقرب من الملعب",
    downtownShopping: "مركز التسوق في وسط المدينة",
    mediumRisk: "مخاطر متوسطة",
    approachingMinors: "تقارير عن أشخاص يقتربون من القاصرين غير المصحوبين",
    riversideSchool: "مدرسة ريفرسايد الابتدائية",
    safeZone: "منطقة آمنة",
    increasedSecurity: "زيادة إجراءات الأمن والسلامة",
    filterAlerts: "تصفية التنبيهات",
    reportNewConcern: "الإبلاغ عن قلق جديد",
    knowTheSigns: "اعرف العلامات",
    active: "نشط",
    signsDescription: "حملة تعليمية حول التعرف على علامات الإساءة",
    signsContent: "توفر هذه الحملة مواد تعليمية لمساعدة أفراد المجتمع على التعرف على علامات إساءة معاملة الأطفال والإهمال.",
    materials: "المواد",
    joinCampaign: "انضم إلى الحملة",
    safeSchools: "مبادرة المدارس الآمنة",
    schoolsDescription: "خلق بيئات تعليمية أكثر أماناً",
    schoolsContent: "جهد تعاوني بين المدارس وأولياء الأمور والمنظمات المجتمعية لتعزيز السلامة في البيئات التعليمية.",
    digitalSafety: "السلامة الرقمية للأسر",
    comingSoon: "قريباً",
    digitalDescription: "حماية الأطفال في العالم الرقمي",
    digitalContent: "سيتم إطلاق هذه الحملة الشهر المقبل، وستركز على السلامة عبر الإنترنت، ومنع التنمر الإلكتروني، والمواطنة الرقمية المسؤولة.",
    getNotified: "احصل على إشعار",
    becomeAmbassador: "كن سفيراً مجتمعياً",
    ambassadorDescription: "ساعد في نشر الوعي من خلال أن تصبح سفيراً مجتمعياً لحماية. احصل على التدريب والموارد لتعليم الآخرين.",
    applyNow: "تقدم الآن",
    upcomingEvents: "الفعاليات المجتمعية القادمة",
    eventsDescription: "انضم إلى الفعاليات المحلية التي تركز على سلامة وحماية الأطفال",
    childSafetyWorkshop: "ورشة عمل سلامة الأطفال",
    communityCenter: "المركز المجتمعي، 10:00 صباحاً - 2:00 مساءً",
    workshop: "ورشة عمل",
    free: "مجاني",
    register: "سجل"
  }
}

export default function CommunityPage() {
  const { language } = useLanguage()
  const t = translations[language]
  
  // State for alerts
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // State for incremental alert loading
  const [visibleAlerts, setVisibleAlerts] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState(3)
  const [hasMore, setHasMore] = useState(true)
  const alertsContainerRef = useRef<HTMLDivElement>(null)
  
  // Add filter state and handlers
  // State for alerts filtering
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>('ALL')
  const [filterResolved, setFilterResolved] = useState<boolean | null>(null)
  const [filteredAlerts, setFilteredAlerts] = useState<any[]>([])
  const [filterLocation, setFilterLocation] = useState<string>('')
  
  // Apply filters to alerts and update visible alerts
  useEffect(() => {
    if (!alerts.length) return;
    
    // Apply filters
    let filtered = [...alerts];
    
    // Filter by type
    if (filterType !== 'ALL') {
      filtered = filtered.filter(alert => alert.incident.type === filterType);
    }
    
    // Filter by resolution status
    if (filterResolved !== null) {
      filtered = filtered.filter(alert => alert.isResolved === filterResolved);
    }

    // Filter by location (if specified)
    if (filterLocation.trim() !== '') {
      filtered = filtered.filter(alert => 
        alert.incident.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    
    // Update filtered and visible alerts
    setFilteredAlerts(filtered);
    const initialCount = Math.min(visibleCount, filtered.length);
    setVisibleAlerts(filtered.slice(0, initialCount));
    setHasMore(filtered.length > initialCount);
  }, [alerts, filterType, filterResolved, filterLocation, visibleCount]);

  // Update the fetchAlerts function to set filteredAlerts
  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true)
        // Fetch real incidents from the API
        const response = await fetch('/api/incidents')
        const data = await response.json()
        
        let allAlerts = []
        
        if (data.success && data.alerts && data.alerts.length > 0) {
          // Transform the API data to match our expected format
          allAlerts = data.alerts.map((alert: any) => {
            // Ensure we have valid coordinates
            const hasCoordinates = 
              alert.incident.latitude !== null && 
              alert.incident.longitude !== null;
            
            // Generate random coordinates near Cairo if none are provided
            const randomLat = 30.0444 + (Math.random() * 0.01 - 0.005);
            const randomLng = 31.2357 + (Math.random() * 0.01 - 0.005);
            
            return {
              id: alert.id,
              incident: {
                ...alert.incident,
                latitude: hasCoordinates ? parseFloat(alert.incident.latitude) : randomLat,
                longitude: hasCoordinates ? parseFloat(alert.incident.longitude) : randomLng
              },
              isResolved: alert.isResolved || false
            };
          })
        } else {
          // If API fails or returns no data, use sample data
          allAlerts = [
            {
              id: '1',
              incident: {
                id: '1',
                type: 'PHYSICAL_ABUSE',
                location: 'Central Park Area',
                latitude: 30.0444,
                longitude: 31.2357,
                description: 'Multiple reports of suspicious activity near playground',
                createdAt: new Date().toISOString()
              },
              isResolved: false
            },
            {
              id: '2',
              incident: {
                id: '2',
                type: 'NEGLECT',
                location: 'Downtown Shopping Center',
                latitude: 30.0500,
                longitude: 31.2400,
                description: 'Reports of individuals approaching unaccompanied minors',
                createdAt: new Date().toISOString()
              },
              isResolved: false
            },
            {
              id: '3',
              incident: {
                id: '3',
                type: 'OTHER',
                location: 'Riverside Elementary School',
                latitude: 30.0480,
                longitude: 31.2320,
                description: 'Increased security and safety measures implemented',
                createdAt: new Date().toISOString()
              },
              isResolved: true
            }
          ]
        }
        
        // Sort alerts by date (newest first)
        allAlerts.sort((a, b) => {
          return new Date(b.incident.createdAt).getTime() - new Date(a.incident.createdAt).getTime();
        });
        
        setAlerts(allAlerts)
        setFilteredAlerts(allAlerts)
        
        // Set initial visible alerts
        const initialCount = Math.min(visibleCount, allAlerts.length);
        setVisibleAlerts(allAlerts.slice(0, initialCount));
        setHasMore(allAlerts.length > initialCount);
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching alerts:', error)
        // If there's an error, use sample data
        const fallbackData = [
          {
            id: '1',
            incident: {
              id: '1',
              type: 'PHYSICAL_ABUSE',
              location: 'Central Park Area',
              latitude: 30.0444,
              longitude: 31.2357,
              description: 'Multiple reports of suspicious activity near playground',
              createdAt: new Date().toISOString()
            },
            isResolved: false
          }
        ]
        setAlerts(fallbackData)
        setFilteredAlerts(fallbackData)
        setVisibleAlerts(fallbackData)
        setHasMore(false)
        setLoading(false)
      }
    }
    
    fetchAlerts()
  }, [])

  // Update loadMoreAlerts to use filteredAlerts instead of alerts
  const loadMoreAlerts = () => {
    const nextCount = visibleCount + 3;
    const newVisibleAlerts = filteredAlerts.slice(0, nextCount);
    
    // Add a small delay to simulate loading for better UX
    setTimeout(() => {
      setVisibleAlerts(newVisibleAlerts);
      setVisibleCount(nextCount);
      setHasMore(nextCount < filteredAlerts.length);
    }, 500);
  };

  // Handle filter change
  const handleFilterChange = (type: string, resolved: boolean | null) => {
    setFilterType(type);
    setFilterResolved(resolved);
    setVisibleCount(3); // Reset visible count when filter changes
    setFilterOpen(false);
  };

  // Handle filter reset
  const handleFilterReset = () => {
    setFilterType('ALL');
    setFilterResolved(null);
    setFilterLocation('');
    setVisibleCount(3);
    setFilterOpen(false);
  };

  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.title}
        </h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder={t.searchPlaceholder} className="pl-8" />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t.notifications}
          </Label>
          <Switch id="notifications" />
        </div>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4">
          <TabsTrigger value="map">{t.localAlertsMap}</TabsTrigger>
          <TabsTrigger value="campaigns">{t.educationCampaigns}</TabsTrigger>
          <TabsTrigger value="events">{t.communityEvents}</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-6 pt-6">
          <div className="space-y-6">
            <div className="w-full h-[400px] border rounded-lg overflow-hidden">
              <SafetyMap 
                alerts={alerts} 
                userLocation={{ latitude: 30.0444, longitude: 31.2357 }} 
                radius="2"
                loading={loading}
              />
            </div>
          
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{t.recentAlerts}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {filterType !== 'ALL' || filterResolved !== null ? (
                      <span className="flex items-center">
                        {language === 'en' ? 'Filtered' : 'تمت التصفية'} ({filteredAlerts.length})
                      </span>
                    ) : (
                      <span>{alerts.length} {language === 'en' ? 'reports' : 'تقارير'}</span>
                    )}
                  </Badge>
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="flex items-center gap-1 h-8"
                    >
                      <Search className="h-3.5 w-3.5" />
                      {filterOpen ? 
                        (language === 'en' ? 'Close Filters' : 'إغلاق الفلاتر') : 
                        (language === 'en' ? 'Filter' : 'تصفية')}
                    </Button>
                    
                    {filterOpen && (
                      <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 z-10 animate-fadeIn w-72 sm:w-80">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">{language === 'en' ? 'Filter by Type' : 'تصفية حسب النوع'}</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <Button 
                                variant={filterType === 'ALL' ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange('ALL', filterResolved)}
                                className="w-full"
                              >
                                {language === 'en' ? 'All Types' : 'كل الأنواع'}
                              </Button>
                              <Button 
                                variant={filterType === 'PHYSICAL_ABUSE' ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange('PHYSICAL_ABUSE', filterResolved)}
                                className="w-full"
                              >
                                {language === 'en' ? 'Physical Abuse' : 'إساءة جسدية'}
                              </Button>
                              <Button 
                                variant={filterType === 'NEGLECT' ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange('NEGLECT', filterResolved)}
                                className="w-full"
                              >
                                {language === 'en' ? 'Neglect' : 'إهمال'}
                              </Button>
                              <Button 
                                variant={filterType === 'OTHER' ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange('OTHER', filterResolved)}
                                className="w-full"
                              >
                                {language === 'en' ? 'Other' : 'أخرى'}
                              </Button>
                              <Button 
                                variant={filterType === 'SEXUAL_ABUSE' ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange('SEXUAL_ABUSE', filterResolved)}
                                className="w-full"
                              >
                                {language === 'en' ? 'Sexual Abuse' : 'إساءة جنسية'}
                              </Button>
                              <Button 
                                variant={filterType === 'PSYCHOLOGICAL_ABUSE' ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange('PSYCHOLOGICAL_ABUSE', filterResolved)}
                                className="w-full"
                              >
                                {language === 'en' ? 'Psychological' : 'إساءة نفسية'}
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">{language === 'en' ? 'Filter by Location' : 'تصفية حسب الموقع'}</h4>
                            <div className="relative">
                              <Input 
                                placeholder={language === 'en' ? "Enter location..." : "أدخل الموقع..."}
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                                className="mb-3"
                              />
                              {filterLocation && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-1 top-1 h-7 w-7 p-0"
                                  onClick={() => setFilterLocation('')}
                                >
                                  <span className="sr-only">Clear</span>
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">{language === 'en' ? 'Filter by Status' : 'تصفية حسب الحالة'}</h4>
                            <div className="grid grid-cols-3 gap-2">
                              <Button 
                                variant={filterResolved === null ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange(filterType, null)}
                                className="w-full"
                              >
                                {language === 'en' ? 'All' : 'الكل'}
                              </Button>
                              <Button 
                                variant={filterResolved === false ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange(filterType, false)}
                                className="w-full"
                              >
                                {language === 'en' ? 'Active' : 'نشط'}
                              </Button>
                              <Button 
                                variant={filterResolved === true ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => handleFilterChange(filterType, true)}
                                className="w-full"
                              >
                                {language === 'en' ? 'Resolved' : 'تم الحل'}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={handleFilterReset}
                              className="text-xs"
                            >
                              {language === 'en' ? 'Reset' : 'إعادة تعيين'}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setFilterOpen(false)}
                              className="text-xs"
                            >
                              {language === 'en' ? 'Apply' : 'تطبيق'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div ref={alertsContainerRef} className="space-y-3">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <>
                    {visibleAlerts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        {language === 'en' ? 'No alerts found in your area' : 'لم يتم العثور على تنبيهات في منطقتك'}
                      </div>
                    ) : (
                      <>
                        {visibleAlerts.map((alert, index) => {
                          const incident = alert.incident;
                          const isNew = new Date(incident.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);
                          
                          // Determine alert type and color
                          let iconColor = 'text-red-500';
                          let badgeVariant = 'destructive';
                          let badgeText = t.highRisk;
                          let badgeCustomClass = '';
                          
                          if (alert.isResolved) {
                            iconColor = 'text-green-500';
                            badgeVariant = 'outline';
                            badgeText = language === 'en' ? 'Resolved' : 'تم الحل';
                            badgeCustomClass = 'bg-green-50 text-green-600 border-green-200';
                          } else {
                            // Colors and texts based on incident type
                            switch(incident.type) {
                              case 'PHYSICAL_ABUSE':
                                iconColor = 'text-red-500';
                                badgeVariant = 'destructive';
                                badgeText = language === 'en' ? 'Physical Abuse' : 'إساءة جسدية';
                                badgeCustomClass = '';
                                break;
                              case 'SEXUAL_ABUSE':
                                iconColor = 'text-purple-600';
                                badgeVariant = 'outline';
                                badgeText = language === 'en' ? 'Sexual Abuse' : 'إساءة جنسية';
                                badgeCustomClass = 'bg-purple-50 text-purple-600 border-purple-200';
                                break;
                              case 'NEGLECT':
                                iconColor = 'text-amber-500';
                                badgeVariant = 'outline';
                                badgeText = language === 'en' ? 'Neglect' : 'إهمال';
                                badgeCustomClass = 'bg-amber-50 text-amber-600 border-amber-200';
                                break;
                              case 'EMOTIONAL_ABUSE':
                                iconColor = 'text-pink-500';
                                badgeVariant = 'outline';
                                badgeText = language === 'en' ? 'Emotional Abuse' : 'إساءة عاطفية';
                                badgeCustomClass = 'bg-pink-50 text-pink-600 border-pink-200';
                                break;
                              case 'PSYCHOLOGICAL_ABUSE':
                                iconColor = 'text-violet-500';
                                badgeVariant = 'outline';
                                badgeText = language === 'en' ? 'Psychological' : 'إساءة نفسية';
                                badgeCustomClass = 'bg-violet-50 text-violet-600 border-violet-200';
                                break;
                              case 'OTHER':
                                iconColor = 'text-indigo-500';
                                badgeVariant = 'outline';
                                badgeText = language === 'en' ? 'Other' : 'أخرى';
                                badgeCustomClass = 'bg-indigo-50 text-indigo-600 border-indigo-200';
                                break;
                              default:
                                iconColor = 'text-red-500';
                                badgeVariant = 'destructive';
                                badgeText = t.highRisk;
                                break;
                            }
                          }
                          
                          return (
                            <div 
                              key={alert.id} 
                              className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border animate-fadeIn"
                              style={{ animationDelay: `${index * 150}ms` }}
                            >
                              <MapPin className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-sm font-medium">{incident.location}</h4>
                                  <Badge 
                                    variant={badgeVariant as any} 
                                    className={`text-xs ${badgeCustomClass}`}
                                  >
                                    {badgeText}
                                  </Badge>
                                  {isNew && (
                                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                                      {language === 'en' ? 'New' : 'جديد'}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {incident.description}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(incident.createdAt).toLocaleString()} - {incident.type.replace('_', ' ')}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        
                        {hasMore && (
                          <div className="flex justify-center pt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={loadMoreAlerts}
                              className="text-xs"
                            >
                              {language === 'en' ? 'Load more alerts' : 'تحميل المزيد من التنبيهات'}
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{t.knowTheSigns}</CardTitle>
                  <Badge className="bg-emerald-500">{t.active}</Badge>
                </div>
                <CardDescription>{t.signsDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.signsContent}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <FileText className="h-4 w-4" />
                  {t.materials}
                </Button>
                <Button className="flex items-center gap-2 w-full sm:w-auto">
                  <ExternalLink className="h-4 w-4" />
                  {t.joinCampaign}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{t.safeSchools}</CardTitle>
                  <Badge className="bg-emerald-500">{t.active}</Badge>
                </div>
                <CardDescription>{t.schoolsDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.schoolsContent}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <FileText className="h-4 w-4" />
                  {t.materials}
                </Button>
                <Button className="flex items-center gap-2 w-full sm:w-auto">
                  <ExternalLink className="h-4 w-4" />
                  {t.joinCampaign}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{t.digitalSafety}</CardTitle>
                  <Badge variant="outline">{t.comingSoon}</Badge>
                </div>
                <CardDescription>{t.digitalDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.digitalContent}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <Button variant="outline" disabled className="flex items-center gap-2 w-full sm:w-auto">
                  <FileText className="h-4 w-4" />
                  {t.materials}
                </Button>
                <Button disabled className="flex items-center gap-2 w-full sm:w-auto">
                  <Bell className="h-4 w-4" />
                  {t.getNotified}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
                <Users className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-semibold">{t.becomeAmbassador}</h3>
                <p className="text-muted-foreground">
                  {t.ambassadorDescription}
                </p>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">{t.applyNow}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t.upcomingEvents}</CardTitle>
                  <CardDescription>{t.eventsDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-md flex flex-col items-center justify-center text-emerald-600">
                        <span className="text-xs font-medium">MAY</span>
                        <span className="text-lg font-bold">20</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{t.childSafetyWorkshop}</h4>
                        <p className="text-sm text-muted-foreground">{t.communityCenter}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {t.workshop}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {t.free}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">{t.register}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>View all upcoming events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col items-center justify-center p-6">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">Calendar view would be displayed here</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-2">
                  <Button variant="outline" size="sm" className="px-2 sm:px-3">
                    Previous
                  </Button>
                  <div className="font-medium text-sm sm:text-base">May 2025</div>
                  <Button variant="outline" size="sm" className="px-2 sm:px-3">
                    Next
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Host an Event</CardTitle>
                  <CardDescription>Organize your own community safety event</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    We provide resources and support for community members who want to organize their own safety
                    awareness events.
                  </p>
                  <Button className="w-full">Request Event Kit</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
