'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Bell, Video, FileText, Users, Search, Calendar, ExternalLink } from "lucide-react"
import { useLanguage } from "@/context/language-context"

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
          <Card>
            <CardHeader>
              <CardTitle>{t.interactiveSafetyMap}</CardTitle>
              <CardDescription>{t.mapDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col items-center justify-center p-6">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  {t.mapPlaceholder}
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">{t.mapDataPlaceholder}</p>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">{t.recentAlerts}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{t.centralPark}</h4>
                        <Badge variant="destructive" className="text-xs">
                          {t.highRisk}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.suspiciousActivity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{t.downtownShopping}</h4>
                        <Badge variant="outline" className="text-xs border-amber-500 text-amber-500">
                          {t.mediumRisk}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.approachingMinors}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{t.riversideSchool}</h4>
                        <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-500">
                          {t.safeZone}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.increasedSecurity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <Button variant="outline" className="w-full sm:w-auto">{t.filterAlerts}</Button>
              <Button className="w-full sm:w-auto">{t.reportNewConcern}</Button>
            </CardFooter>
          </Card>
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
