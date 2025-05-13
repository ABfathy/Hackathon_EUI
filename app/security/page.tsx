'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock, UserCheck, Eye, Bot, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const translations = {
  en: {
    title: "Security & Privacy",
    subtitle: "Manage your security settings, privacy preferences, and account verification.",
    securityReminder: "Security Reminder",
    securityDescription: "Protecting your account helps safeguard sensitive information. We recommend enabling two-factor authentication.",
    enable2FA: "Enable 2FA",
    profileVerification: "Profile Verification",
    profileDescription: "Verify your identity to ensure a safe environment for all users",
    emailVerification: "Email Verification",
    emailVerified: "Your email has been verified",
    phoneVerification: "Phone Verification",
    phoneDescription: "Verify your phone number for additional security",
    verifyNow: "Verify Now",
    idVerification: "ID Verification",
    idDescription: "Required for certain features and higher trust levels",
    uploadID: "Upload ID",
    ageVerification: "Age Verification",
    ageDescription: "For child safety, we require age verification for accounts of children under 18. Parents or guardians must complete this verification.",
    accountType: "Account Type",
    parentAccount: "Parent/Guardian Account",
    childAccount: "Child Account (Under 18)",
    forChildAccounts: "For Child Accounts",
    parentEmail: "Parent/Guardian Email",
    parentPhone: "Parent/Guardian Phone",
    verificationNote: "We'll send a verification link to the parent/guardian to approve this account.",
    saveVerification: "Save Verification Settings",
    privacySettings: "Privacy Settings",
    privacyDescription: "Control how your information is used and shared",
    profileVisibility: "Profile Visibility",
    visibilityDescription: "Control who can see your profile information",
    private: "Private",
    activityTracking: "Activity Tracking",
    trackingDescription: "Allow us to collect usage data to improve services",
    locationServices: "Location Services",
    locationDescription: "Allow access to your location for local alerts",
    dataManagement: "Data Management",
    changePassword: "Change Password",
    newPassword: "New password",
    dataDeletion: "Data Deletion",
    deletionDescription: "Request deletion of all your data from our platform",
    requestDeletion: "Request Deletion",
    consentManagement: "Consent Management",
    privacyConsent: "I consent to the processing of my personal data as described in the Privacy Policy",
    marketingConsent: "I consent to receiving safety updates and educational materials via email",
    researchConsent: "I consent to my anonymized data being used for research to improve child safety",
    savePrivacy: "Save Privacy Settings",
    aiSettings: "AI Assistant Settings",
    aiDescription: "Configure how the AI assistant interacts with you",
    enableAI: "Enable AI Assistant",
    aiDescription2: "Turn the AI assistant on or off",
    voiceGuidance: "Voice Guidance",
    voiceDescription: "Enable voice responses from the AI assistant",
    childFriendlyMode: "Child-Friendly Mode",
    childFriendlyDescription: "Simplify language and content for younger users"
  },
  ar: {
    title: "الأمان والخصوصية",
    subtitle: "إدارة إعدادات الأمان وتفضيلات الخصوصية والتحقق من الحساب.",
    securityReminder: "تذكير الأمان",
    securityDescription: "حماية حسابك تساعد في حماية المعلومات الحساسة. نوصي بتفعيل المصادقة الثنائية.",
    enable2FA: "تفعيل المصادقة الثنائية",
    profileVerification: "التحقق من الملف الشخصي",
    profileDescription: "تحقق من هويتك لضمان بيئة آمنة لجميع المستخدمين",
    emailVerification: "التحقق من البريد الإلكتروني",
    emailVerified: "تم التحقق من بريدك الإلكتروني",
    phoneVerification: "التحقق من رقم الهاتف",
    phoneDescription: "تحقق من رقم هاتفك لأمان إضافي",
    verifyNow: "تحقق الآن",
    idVerification: "التحقق من الهوية",
    idDescription: "مطلوب لميزات معينة ومستويات ثقة أعلى",
    uploadID: "رفع الهوية",
    ageVerification: "التحقق من العمر",
    ageDescription: "لسلامة الأطفال، نطلب التحقق من العمر للحسابات التي تقل أعمارهم عن 18 عاماً. يجب على الوالدين أو الأوصياء إكمال هذا التحقق.",
    accountType: "نوع الحساب",
    parentAccount: "حساب الوالد/الوصي",
    childAccount: "حساب الطفل (أقل من 18)",
    forChildAccounts: "لحسابات الأطفال",
    parentEmail: "بريد الوالد/الوصي الإلكتروني",
    parentPhone: "هاتف الوالد/الوصي",
    verificationNote: "سنرسل رابط تحقق إلى الوالد/الوصي للموافقة على هذا الحساب.",
    saveVerification: "حفظ إعدادات التحقق",
    privacySettings: "إعدادات الخصوصية",
    privacyDescription: "التحكم في كيفية استخدام ومشاركة معلوماتك",
    profileVisibility: "رؤية الملف الشخصي",
    visibilityDescription: "التحكم في من يمكنه رؤية معلومات ملفك الشخصي",
    private: "خاص",
    activityTracking: "تتبع النشاط",
    trackingDescription: "السماح لنا بجمع بيانات الاستخدام لتحسين الخدمات",
    locationServices: "خدمات الموقع",
    locationDescription: "السماح بالوصول إلى موقعك للتنبيهات المحلية",
    dataManagement: "إدارة البيانات",
    changePassword: "تغيير كلمة المرور",
    newPassword: "كلمة مرور جديدة",
    dataDeletion: "حذف البيانات",
    deletionDescription: "طلب حذف جميع بياناتك من منصتنا",
    requestDeletion: "طلب الحذف",
    consentManagement: "إدارة الموافقة",
    privacyConsent: "أوافق على معالجة بياناتي الشخصية كما هو موضح في سياسة الخصوصية",
    marketingConsent: "أوافق على تلقي تحديثات السلامة والمواد التعليمية عبر البريد الإلكتروني",
    researchConsent: "أوافق على استخدام بياناتي المجهولة المصدر للبحث لتحسين سلامة الأطفال",
    savePrivacy: "حفظ إعدادات الخصوصية",
    aiSettings: "إعدادات المساعد الذكي",
    aiDescription: "تكوين كيفية تفاعل المساعد الذكي معك",
    enableAI: "تفعيل المساعد الذكي",
    aiDescription2: "تشغيل أو إيقاف المساعد الذكي",
    voiceGuidance: "التوجيه الصوتي",
    voiceDescription: "تفعيل الردود الصوتية من المساعد الذكي",
    childFriendlyMode: "الوضع الصديق للأطفال",
    childFriendlyDescription: "تبسيط اللغة والمحتوى للمستخدمين الأصغر سناً"
  }
}

export default function SecurityPage() {
  const { language } = useLanguage()
  const t = translations[language]

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

      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-amber-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">{t.securityReminder}</h3>
            <p className="text-muted-foreground">
              {t.securityDescription}
            </p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">{t.enable2FA}</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">{t.profileVerification}</TabsTrigger>
          <TabsTrigger value="privacy">{t.privacySettings}</TabsTrigger>
          <TabsTrigger value="assistant">{t.aiSettings}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.profileVerification}</CardTitle>
              <CardDescription>{t.profileDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.emailVerification}</Label>
                    <p className="text-sm text-muted-foreground">{t.emailVerified}</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <UserCheck className="h-4 w-4" />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.phoneVerification}</Label>
                    <p className="text-sm text-muted-foreground">{t.phoneDescription}</p>
                  </div>
                  <Button size="sm">{t.verifyNow}</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.idVerification}</Label>
                    <p className="text-sm text-muted-foreground">{t.idDescription}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    {t.uploadID}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t.ageVerification}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.ageDescription}
                </p>

                <div className="space-y-2">
                  <Label>{t.accountType}</Label>
                  <RadioGroup defaultValue="parent">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="parent" id="parent" />
                        <Label htmlFor="parent">{t.parentAccount}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="child" id="child" />
                        <Label htmlFor="child">{t.childAccount}</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>{t.forChildAccounts}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder={t.parentEmail} />
                    <Input placeholder={t.parentPhone} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.verificationNote}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t.saveVerification}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.privacySettings}</CardTitle>
              <CardDescription>{t.privacyDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.profileVisibility}</Label>
                    <p className="text-sm text-muted-foreground">{t.visibilityDescription}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      <span>{t.private}</span>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.activityTracking}</Label>
                    <p className="text-sm text-muted-foreground">{t.trackingDescription}</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.locationServices}</Label>
                    <p className="text-sm text-muted-foreground">{t.locationDescription}</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t.dataManagement}</h3>
                <div className="space-y-2">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">{t.changePassword}</Label>
                    <div className="relative">
                      <Input id="password" type="password" placeholder={t.newPassword} />
                      <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.dataDeletion}</Label>
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm">{t.deletionDescription}</p>
                    <Button variant="destructive" size="sm">
                      {t.requestDeletion}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t.consentManagement}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      {t.privacyConsent}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing" className="text-sm">
                      {t.marketingConsent}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="research" />
                    <Label htmlFor="research" className="text-sm">
                      {t.researchConsent}
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t.savePrivacy}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.aiSettings}</CardTitle>
              <CardDescription>{t.aiDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.enableAI}</Label>
                    <p className="text-sm text-muted-foreground">{t.aiDescription2}</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.voiceGuidance}</Label>
                    <p className="text-sm text-muted-foreground">{t.voiceDescription}</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{t.childFriendlyMode}</Label>
                    <p className="text-sm text-muted-foreground">{t.childFriendlyDescription}</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language Settings</h3>
                <div className="space-y-2">
                  <Label>Primary Language</Label>
                  <RadioGroup defaultValue="english">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="english" id="english" />
                        <Label htmlFor="english">English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="arabic" id="arabic" />
                        <Label htmlFor="arabic">Arabic (العربية)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bilingual" id="bilingual" />
                        <Label htmlFor="bilingual">Bilingual (English & Arabic)</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Privacy</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-conversations" />
                    <Label htmlFor="save-conversations" className="text-sm">
                      Save conversation history for better assistance
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anonymous-data" />
                    <Label htmlFor="anonymous-data" className="text-sm">
                      Allow anonymous data collection to improve AI responses
                    </Label>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Clear Conversation History
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full">Save Assistant Settings</Button>
              <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 dark:bg-blue-950 rounded-md w-full">
                <Bot className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600">Try saying: "How can I keep my child safe online?"</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
