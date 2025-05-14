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
// Placeholder: Import your actual useUser hook
// import { useUser } from "@/context/user-context"; 

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
    emergencyDescription: "للحصول على مساعدة فورية في حالات الطوارئ، يرجى الاتصال بخط حماية الطفل الوطني.",
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

  // Placeholder: Replace with your actual user data from useUser()
  // The useUser() hook would fetch user data and calculate age for children.
  // Example structure for a parent:
  // const user = { userType: 'PARENT', phoneNumber: '1234567890', parentEmail: 'parent@example.com', age: null };
  // Example structure for a child (age calculated from dateOfBirth by useUser):
  const user = { userType: 'CHILD', age: 7 }; // Assuming age is calculated and provided

  // Define age-specific content for the reporting guide
  const getAgeSpecificStep1Description = () => {
    if (user.userType === 'CHILD') {
      if (typeof user.age === 'number') {
        if (user.age <= 8) {
          return language === 'en' ? "If you feel unsafe, tell a grown-up you trust right away, like a parent or teacher. They can help call for help if needed." : "إذا شعرت بعدم الأمان، أخبر شخصًا بالغًا تثق به على الفور، مثل أحد الوالدين أو المعلم. يمكنهم المساعدة في طلب المساعدة إذا لزم الأمر.";
        } else if (user.age <= 12) {
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
        <TabsList className={`grid w-full ${user.userType === 'PARENT' ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <TabsTrigger value="report">{t.reportIncident}</TabsTrigger>
          {user.userType === 'PARENT' && (
            <TabsTrigger value="alerts">{t.alertSystem}</TabsTrigger>
          )}
          <TabsTrigger value="guide">{t.reportingGuide}</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.anonymousReport}</CardTitle>
              <CardDescription>
                {t.reportDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t.incidentType}</Label>
                <RadioGroup defaultValue="physical">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="physical" id="physical" />
                      <Label htmlFor="physical">{t.physicalAbuse}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="emotional" id="emotional" />
                      <Label htmlFor="emotional">{t.emotionalAbuse}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sexual" id="sexual" />
                      <Label htmlFor="sexual">{t.sexualAbuse}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neglect" id="neglect" />
                      <Label htmlFor="neglect">{t.neglect}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">{t.other}</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t.location}</Label>
                <Input id="location" placeholder={t.locationPlaceholder} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t.description}</Label>
                <Textarea id="description" placeholder={t.descriptionPlaceholder} rows={5} />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  {t.contactInfo}
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder={t.namePlaceholder} />
                  <Input placeholder={t.contactPlaceholder} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">{t.submitReport}</Button>
              <p className="text-xs text-muted-foreground text-center">
                {t.submitDisclaimer}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {user.userType === 'PARENT' && (
          <TabsContent value="alerts" className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.recentAlerts}</CardTitle>
                  <CardDescription>{t.alertsDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{t.highPriority}</h4>
                          <Badge variant="destructive" className="text-xs">
                            {t.new}
                          </Badge>
                        </div>
                        <p className="text-sm">{t.alert1}</p>
                        <p className="text-xs text-muted-foreground">May 13, 2025 - 2:45 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                      <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{t.communityNotice}</h4>
                        </div>
                        <p className="text-sm">{t.alert2}</p>
                        <p className="text-xs text-muted-foreground">May 12, 2025 - 10:30 AM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{t.resolved}</h4>
                        </div>
                        <p className="text-sm">{t.alert3}</p>
                        <p className="text-xs text-muted-foreground">May 10, 2025 - 5:15 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {t.viewAllAlerts}
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
                        <Button variant="outline" size="sm">
                          1 km
                        </Button>
                        <Button variant="outline" size="sm" className="bg-emerald-50 border-emerald-200">
                          5 km
                        </Button>
                        <Button variant="outline" size="sm">
                          10 km
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t.savePreferences}</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        )}

        <TabsContent value="guide" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.stepByStep}</CardTitle>
              <CardDescription>{t.guideDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-medium">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">{t.step1}</h4>
                    <p className="text-sm text-muted-foreground">
                      {getAgeSpecificStep1Description()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
