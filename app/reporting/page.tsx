'use client'

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, ExternalLink, FileText, Info, Phone, Wind } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { calculateAge } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, MapPin } from "lucide-react"
import Link from "next/link"
import LocationSearch from "@/components/location-search"
import SafetyMap from "@/components/safety-map"

const translations = {
  en: {
    title: "Reporting & Monitoring",
    subtitle: "Report incidents anonymously and access real-time monitoring and alert systems.",
    emergencyHotline: "Emergency Hotline",
    emergencyDescription: "For immediate assistance in emergency situations, please call the national child protection hotline.",
    callButton: "Call 16000",
    reportIncident: "Report Incident",
    alertSystem: "Alert System",

    reportingGuide: "Reporting Guide",
    anonymousReport: "Anonymous Incident Report",
    reportDescription: "Your information will be kept confidential. You can choose to remain anonymous.",
    incidentType: "Type of Incident",
    physicalAbuse: "Physical Abuse",
    emotionalAbuse: "Emotional Abuse",
    sexualAbuse: "Sexual Abuse",
    neglect: "Neglect",
    other: "Other",
    location: "Location",
    locationPlaceholder: "City, neighborhood, or specific location",
    description: "Description of Incident",
    descriptionPlaceholder: "Please provide as much detail as possible",
    contactInfo: "Your Contact Information (Optional)",
    namePlaceholder: "Name (Optional)",
    contactPlaceholder: "Phone or Email (Optional)",
    submitReport: "Submit Report",
    submitDisclaimer: "By submitting this report, you confirm that the information provided is true to the best of your knowledge.",
    recentAlerts: "Recent Alerts",
    alertsDescription: "Real-time notifications and alerts in your area",
    highPriority: "High Priority Alert",
    new: "New",
    alert1: "Suspicious individual reported near Central Elementary School. Authorities have been notified.",
    communityNotice: "Community Notice",
    alert2: "Increased reports of online solicitation targeting teenagers in the area. Please monitor children's online activities.",
    resolved: "Resolved",
    alert3: "Missing child alert from Downtown area has been resolved. Child has been safely reunited with family.",
    viewAllAlerts: "View All Alerts",
    alertSettings: "Alert Settings",
    settingsDescription: "Customize your notification preferences",
    pushNotifications: "Push Notifications",
    pushDescription: "Receive alerts on your device",
    emailAlerts: "Email Alerts",
    emailDescription: "Receive alerts via email",
    smsNotifications: "SMS Notifications",
    smsDescription: "Receive text message alerts",
    alertRadius: "Alert Radius",
    savePreferences: "Save Preferences",
    stepByStep: "Step-by-Step Reporting Guide",
    guideDescription: "How to report incidents to authorities or emergency services",
    step1: "Assess the Situation",
    step1Description: "Determine if the child is in immediate danger. If so, call emergency services immediately at 911."
  },
  ar: {
    title: "الإبلاغ والمراقبة",
    subtitle: "قم بالإبلاغ عن الحوادث بشكل مجهول والوصول إلى أنظمة المراقبة والتنبيه في الوقت الفعلي.",
    emergencyHotline: "خط الطوارئ",
    emergencyDescription: "للحصول على مساعدة فورية في حالات الطوارئ، يرجى الاتصال بالخط الساخن الوطني لحماية الطفل.",
    callButton: "اتصل بـ 16000",
    reportIncident: "الإبلاغ عن حادث",
    alertSystem: "نظام التنبيه",

    reportingGuide: "دليل الإبلاغ",
    anonymousReport: "تقرير حادث مجهول",
    reportDescription: "سيتم الحفاظ على سرية معلوماتك. يمكنك اختيار البقاء مجهولاً.",
    incidentType: "نوع الحادث",
    physicalAbuse: "إساءة جسدية",
    emotionalAbuse: "إساءة عاطفية",
    sexualAbuse: "إساءة جنسية",
    neglect: "إهمال",
    other: "أخرى",
    location: "الموقع",
    locationPlaceholder: "المدينة، الحي، أو موقع محدد",
    description: "وصف الحادث",
    descriptionPlaceholder: "يرجى تقديم أكبر قدر ممكن من التفاصيل",
    contactInfo: "معلومات الاتصال الخاصة بك (اختياري)",
    namePlaceholder: "الاسم (اختياري)",
    contactPlaceholder: "الهاتف أو البريد الإلكتروني (اختياري)",
    submitReport: "إرسال التقرير",
    submitDisclaimer: "بتقديم هذا التقرير، تؤكد أن المعلومات المقدمة صحيحة إلى أفضل معرفتك.",
    recentAlerts: "التنبيهات الأخيرة",
    alertsDescription: "إشعارات وتنبيهات في الوقت الفعلي في منطقتك",
    highPriority: "تنبيه عالي الأولوية",
    new: "جديد",
    alert1: "تم الإبلاغ عن شخص مشبوه بالقرب من مدرسة سنترال الابتدائية. تم إخطار السلطات.",
    communityNotice: "إشعار مجتمعي",
    alert2: "زيادة في تقارير التحرش عبر الإنترنت تستهدف المراهقين في المنطقة. يرجى مراقبة أنشطة الأطفال عبر الإنترنت.",
    resolved: "تم الحل",
    alert3: "تم حل تنبيه الطفل المفقود من منطقة وسط المدينة. تم لم شمل الطفل بأمان مع عائلته.",
    viewAllAlerts: "عرض جميع التنبيهات",
    alertSettings: "إعدادات التنبيه",
    settingsDescription: "تخصيص تفضيلات الإشعارات الخاصة بك",
    pushNotifications: "إشعارات الدفع",
    pushDescription: "تلقي التنبيهات على جهازك",
    emailAlerts: "تنبيهات البريد الإلكتروني",
    emailDescription: "تلقي التنبيهات عبر البريد الإلكتروني",
    smsNotifications: "إشعارات الرسائل القصيرة",
    smsDescription: "تلقي تنبيهات الرسائل النصية",
    alertRadius: "نطاق التنبيه",
    savePreferences: "حفظ التفضيلات",
    stepByStep: "دليل الإبلاغ خطوة بخطوة",
    guideDescription: "كيفية الإبلاغ عن الحوادث للسلطات أو خدمات الطوارئ",
    step1: "تقييم الموقف",
    step1Description: "تحديد ما إذا كان الطفل في خطر فوري. إذا كان الأمر كذلك، اتصل بخدمات الطوارئ فوراً على 16000."
  }
}

export default function ReportingPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const { data: session, status } = useSession()
  const [userDetails, setUserDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [age, setAge] = useState<number | null>(null)
  
  // State for incident reporting form
  const [incidentType, setIncidentType] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userLocation, setUserLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null })
  const [locationDetected, setLocationDetected] = useState(false)
  
  // Form validation errors
  const [errors, setErrors] = useState({
    incidentType: false,
    location: false,
    description: false
  })
  
  // State for alerts
  const [alerts, setAlerts] = useState<any[]>([])
  const [loadingAlerts, setLoadingAlerts] = useState(false)
  const [alertRadius, setAlertRadius] = useState('5') // Default radius is 5km
  
  const userType = session?.user?.userType || null;

  // Show loading state when checking authentication
  if (status === "loading") {
    return (
      <div className="container mx-auto space-y-8 max-w-6xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <div className="flex items-center space-x-2 mt-4">
            <div className="animate-spin h-5 w-5 border-2 border-purple-600 dark:border-purple-400 rounded-full border-t-transparent"></div>
            <p className="text-muted-foreground">{language === "en" ? "Loading content..." : "جاري تحميل المحتوى..."}</p>
          </div>
        </div>
      </div>
    )
  }
  
  // If not authenticated, show login message
  if (status === "unauthenticated" || !session) {
    return (
      <div className="container mx-auto space-y-8 max-w-6xl">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Card className="border-purple-200 dark:border-gray-700 max-w-3xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-emerald-50 dark:from-gray-800/50 dark:to-gray-800/80 rounded-t-lg">
            <CardTitle className="text-purple-600 dark:text-gray-200 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {language === "en" ? "Access Required" : "مطلوب تسجيل الدخول"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">{language === "en" 
              ? "Please sign in to access our reporting system. This feature is only available to authenticated users to ensure security and proper follow-up."
              : "يرجى تسجيل الدخول للوصول إلى نظام الإبلاغ. هذه الميزة متاحة فقط للمستخدمين المصادق عليهم لضمان الأمان والمتابعة المناسبة."}</p>
            <div className="flex justify-between items-center">
              <Link href="/login">
                <Button className="w-full sm:w-auto">
                  {language === "en" ? "Sign In" : "تسجيل الدخول"}
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-600" />
                <p className="text-sm font-medium text-purple-600">
                  {language === "en" ? "Emergency? Call 16000" : "حالة طوارئ؟ اتصل بـ 16000"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Function to fetch user details
  async function fetchUserDetails() {
    if (session?.user?.id) {
      try {
        const response = await fetch(`/api/users/${session.user.id}`);
        if (response.ok) {
          const userData = await response.json();
          setUserDetails(userData);
          if (userData.dateOfBirth) {
            const userAge = calculateAge(userData.dateOfBirth);
            setAge(userAge);
          }
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserDetails()
    } else {
      setLoading(false)
    }
    
    // Get user's location if available
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          setLocationDetected(true)
          // You could use a reverse geocoding service here to get the address
          // For now, we'll just use the coordinates
          
          // Fetch alerts once we have the user's location
          fetchAlerts()
        },
        (error) => {
          console.error('Error getting location:', error)
          // Still fetch alerts even if we couldn't get the location
          fetchAlerts()
        }
      )
    } else {
      // Fetch alerts even if geolocation is not available
      fetchAlerts()
    }
  }, [session])

  // Function to fetch alerts from the API
  async function fetchAlerts() {
    setLoadingAlerts(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (session?.user && 'familyCode' in session.user && session.user.familyCode) {
        params.append('familyCode', session.user.familyCode as string)
      }
      params.append('radius', alertRadius)
      
      // Add coordinates if available for location-based filtering
      if (userLocation.latitude && userLocation.longitude) {
        params.append('latitude', userLocation.latitude.toString())
        params.append('longitude', userLocation.longitude.toString())
      }
      
      const response = await fetch(`/api/alerts?${params.toString()}`)
      const data = await response.json()
      
      if (data.success && data.alerts) {
        // Sort alerts by proximity to user if location is available
        if (userLocation.latitude && userLocation.longitude) {
          const sortedAlerts = [...data.alerts].sort((a, b) => {
            // Calculate distance from user to alert a
            const distA = calculateDistance(
              userLocation.latitude as number, 
              userLocation.longitude as number,
              a.incident.latitude, 
              a.incident.longitude
            );
            
            // Calculate distance from user to alert b
            const distB = calculateDistance(
              userLocation.latitude as number, 
              userLocation.longitude as number,
              b.incident.latitude, 
              b.incident.longitude
            );
            
            // Sort by distance (closest first)
            return distA - distB;
          });
          
          setAlerts(sortedAlerts);
        } else {
          setAlerts(data.alerts);
        }
      } else {
        console.error('Failed to fetch alerts:', data.error)
        // Set empty array if there's an error
        setAlerts([])
      }
    } catch (error) {
      console.error('Error fetching alerts:', error)
      // Set empty array if there's an error
      setAlerts([])
    } finally {
      setLoadingAlerts(false)
    }
  }
  
  // Calculate distance between two points using Haversine formula
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }
  
  // Function to handle changing the alert radius
  function handleRadiusChange(radius: string) {
    setAlertRadius(radius)
    fetchAlerts()
  }
  
  // Function to reset alert filters
  function handleResetAlertFilters() {
    setAlertRadius('5') // Reset to default radius
    
    // Also reset any other filters that might be added in the future
    const params = new URLSearchParams()
    if (session?.user && 'familyCode' in session.user && session.user.familyCode) {
      params.append('familyCode', session.user.familyCode as string)
    }
    params.append('radius', '5') // Use default radius
    
    // Add coordinates if available
    if (userLocation.latitude && userLocation.longitude) {
      params.append('latitude', userLocation.latitude.toString())
      params.append('longitude', userLocation.longitude.toString())
    }
    
    // Reset to include all incidents with no filtering
    params.append('includeAll', 'true')
    
    // Fetch all alerts with no filtering
    setLoadingAlerts(true)
    fetch(`/api/alerts?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.alerts) {
          // Sort alerts by proximity if location available
          if (userLocation.latitude && userLocation.longitude) {
            const sortedAlerts = [...data.alerts].sort((a, b) => {
              const distA = calculateDistance(
                userLocation.latitude as number, 
                userLocation.longitude as number,
                a.incident.latitude, 
                a.incident.longitude
              );
              
              const distB = calculateDistance(
                userLocation.latitude as number, 
                userLocation.longitude as number,
                b.incident.latitude, 
                b.incident.longitude
              );
              
              return distA - distB;
            });
            
            setAlerts(sortedAlerts);
          } else {
            setAlerts(data.alerts);
          }
        } else {
          console.error('Failed to fetch alerts:', data.error)
          setAlerts([])
        }
      })
      .catch(error => {
        console.error('Error fetching alerts:', error)
        setAlerts([])
      })
      .finally(() => {
        setLoadingAlerts(false)
        toast({
          title: "Filters reset",
          description: "All filters have been reset to show all incidents",
          variant: "default"
        })
      })
  }
  
  async function handleSubmitReport(e: React.FormEvent) {
    e.preventDefault()
    
    // Reset previous errors
    setErrors({
      incidentType: false,
      location: false,
      description: false
    })
    
    // Validate required fields
    const newErrors = {
      incidentType: !incidentType,
      location: !location,
      description: !description
    }
    
    setErrors(newErrors)
    
    // Check if any errors exist
    if (newErrors.incidentType || newErrors.location || newErrors.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: incidentType,
          location: location || 'Unknown',
          description,
          name: reporterName || null,
          contact: contactInfo || null,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Report submitted",
          description: "Your incident report has been submitted successfully",
          variant: "default"
        })
        
        // Reset form
        setIncidentType('')
        setLocation('')
        setDescription('')
        setReporterName('')
        setContactInfo('')
        
        // Refresh alerts to show the new one
        fetchAlerts()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit report",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error submitting report:', error)
      toast({
        title: "Error",
        description: "There was a problem submitting your report. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function getAgeSpecificStep1Description() {
    if (userType === 'CHILD') {
      if (typeof age === 'number') {
        if (age <= 8) {
          return language === 'en' ? "If you feel unsafe, tell a grown-up you trust right away, like a parent or teacher. They can help call for help if needed." : "إذا شعرت بعدم الأمان، أخبر شخصًا بالغًا تثق به على الفور، مثل أحد الوالدين أو المعلم. يمكنهم المساعدة في طلب المساعدة إذا لزم الأمر.";
        } else if (age <= 12) {
          return language === 'en' ? "If you or another child is in danger, find a trusted adult immediately. You can also call 16000 with their help if it's an emergency." : "إذا كنت أنت أو طفل آخر في خطر، ابحث عن شخص بالغ موثوق به على الفور. يمكنك أيضًا الاتصال بالرقم 16000 بمساعدتهم إذا كانت حالة طارئة.";
        } else {
          return language === 'en' ? "If you witness or experience a dangerous situation, ensure your safety first, then report to a trusted adult or call emergency services (16000)." : "إذا شاهدت أو تعرضت لموقف خطير، تأكد من سلامتك أولاً، ثم أبلغ شخصًا بالغًا موثوقًا به أو اتصل بخدمات الطوارئ (16000).";
        }
      } else {
        // Default message for child if age is not available for some reason
        return language === 'en' ? "If you are in danger, tell a trusted adult immediately." : "إذا كنت في خطر، أخبر شخصًا بالغًا موثوقًا به على الفور.";
      }
    }
    return t.step1Description; // Default for parents
  };

  if (status === "loading" || loading === true) {
    return (
      <div className="container mx-auto space-y-8 max-w-6xl">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t.title}
          </h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.title}
        </h1>
        <p className="text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <Phone className="h-10 w-10 text-red-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">{t.emergencyHotline}</h3>
            <p className="text-muted-foreground">
              {t.emergencyDescription}
            </p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white">{t.callButton}</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="report">{t.reportIncident}</TabsTrigger>
          <TabsTrigger value="alerts">{t.alertSystem}</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.anonymousReport}</CardTitle>
              <CardDescription>
                {t.reportDescription}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitReport}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className={errors.incidentType ? "text-red-500" : ""}>{t.incidentType} *</Label>
                  <Select
                    value={incidentType}
                    onValueChange={(value) => {
                      setIncidentType(value);
                      setErrors({...errors, incidentType: false});
                    }}
                    required
                  >
                    <SelectTrigger className={errors.incidentType ? "border-red-500 ring-red-500" : ""}>
                      <SelectValue placeholder="Select type of incident" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHYSICAL_ABUSE">{t.physicalAbuse}</SelectItem>
                      <SelectItem value="EMOTIONAL_ABUSE">{t.emotionalAbuse}</SelectItem>
                      <SelectItem value="SEXUAL_ABUSE">{t.sexualAbuse}</SelectItem>
                      <SelectItem value="NEGLECT">{t.neglect}</SelectItem>
                      <SelectItem value="OTHER">{t.other}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.incidentType && (
                    <p className="text-xs text-red-500 mt-1">Please select an incident type</p>
                  )}
                </div>

                <LocationSearch
                  value={location}
                  onChange={(value) => {
                    setLocation(value);
                    setErrors({...errors, location: false});
                  }}
                  onCoordinatesChange={(lat, lng) => {
                    setUserLocation({
                      latitude: lat,
                      longitude: lng
                    });
                  }}
                  userLocation={userLocation}
                  label={t.location}
                  placeholder={t.locationPlaceholder}
                  required={true}
                  error={errors.location}
                  errorMessage="Please enter a location"
                />

                <div className="space-y-2">
                  <Label htmlFor="description" className={errors.description ? "text-red-500" : ""}>{t.description} *</Label>
                  <Textarea 
                    id="description" 
                    placeholder={t.descriptionPlaceholder} 
                    className={`min-h-[120px] ${errors.description ? "border-red-500 ring-red-500" : ""}`} 
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({...errors, description: false});
                    }}
                    required
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">Please provide a description</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>{t.contactInfo}</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input 
                      placeholder={t.namePlaceholder} 
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                    />
                    <Input 
                      placeholder={t.contactPlaceholder} 
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  {t.submitDisclaimer}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : t.submitReport}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {userType === 'PARENT' && (
          <TabsContent value="alerts" className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.recentAlerts}</CardTitle>
                  <CardDescription>{t.alertsDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {loadingAlerts ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                    </div>
                  ) : alerts.length > 0 ? (
                    <div className="space-y-4">
                      {alerts.map((alert) => {
                        const incident = alert.incident;
                        const isNew = new Date(incident.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);
                        
                        // Determine the alert type icon and color
                        let IconComponent = AlertTriangle;
                        let bgColorClass = 'bg-red-100 dark:bg-red-900';
                        let textColorClass = 'text-red-600 dark:text-red-400';
                        
                        if (alert.isResolved) {
                          IconComponent = CheckCircle;
                          bgColorClass = 'bg-green-100 dark:bg-green-900';
                          textColorClass = 'text-green-600 dark:text-green-400';
                        } else if (incident.type === 'NEGLECT' || incident.type === 'OTHER') {
                          IconComponent = Info;
                          bgColorClass = 'bg-amber-100 dark:bg-amber-900';
                          textColorClass = 'text-amber-600 dark:text-amber-400';
                        }
                        
                        return (
                          <div key={alert.id} className="flex items-start gap-4">
                            <div className={`${bgColorClass} p-2 rounded-full`}>
                              <IconComponent className={`h-5 w-5 ${textColorClass}`} />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">
                                  {incident.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </h4>
                                {isNew && (
                                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                                    {t.new}
                                  </Badge>
                                )}
                                {alert.isResolved && (
                                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                    {t.resolved}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm">{incident.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(incident.createdAt).toLocaleString()} - {incident.location}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">No alerts found in your area</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => fetchAlerts()}
                    disabled={loadingAlerts}
                  >
                    {loadingAlerts ? 'Loading...' : t.viewAllAlerts}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.alertSettings}</CardTitle>
                  <CardDescription>{t.settingsDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">{t.pushNotifications}</Label>
                        <p className="text-sm text-muted-foreground">{t.pushDescription}</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">{t.emailAlerts}</Label>
                        <p className="text-sm text-muted-foreground">{t.emailDescription}</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">{t.smsNotifications}</Label>
                        <p className="text-sm text-muted-foreground">{t.smsDescription}</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>{t.alertRadius}</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={alertRadius === '1' ? 'bg-emerald-50 border-emerald-200' : ''}
                          onClick={() => handleRadiusChange('1')}
                        >
                          1 km
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={alertRadius === '5' ? 'bg-emerald-50 border-emerald-200' : ''}
                          onClick={() => handleRadiusChange('5')}
                        >
                          5 km
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={alertRadius === '10' ? 'bg-emerald-50 border-emerald-200' : ''}
                          onClick={() => handleRadiusChange('10')}
                        >
                          10 km
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleResetAlertFilters}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    {language === 'en' ? 'Reset Filters' : 'إعادة تعيين المرشحات'}
                  </Button>
                  <Button 
                    className="w-full sm:w-auto order-1 sm:order-2"
                    onClick={() => {
                      toast({
                        title: "Preferences saved",
                        description: "Your alert preferences have been updated",
                        variant: "default"
                      });
                    }}
                  >
                    {t.savePreferences}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
