'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Lock, Users, Send, Wind, Info, Video, Search } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const translations = {
  en: {
    title: "Support Forum",
    subtitle: "Connect with counselors and join moderated forums for support and guidance.",
    privacyTitle: "Privacy & Confidentiality",
    privacyDescription: "All conversations in our support forums are confidential. Your privacy is our priority.",
    privacyPolicy: "Privacy Policy",
    supportForums: "Support Forums",
    expertCounseling: "Expert Counseling",
    supportResources: "Support Resources",
    confidentialChatrooms: "Confidential Chatrooms",
    chatroomsDescription: "Moderated forums for parents and children to discuss sensitive issues",
    parentsSupportGroup: "Parents Support Group",
    active: "Active",
    membersOnline: "members online",
    typeMessage: "Type your message...",
    messagesConfidential: "All messages are confidential and moderated for safety.",
    viewOtherForums: "View Other Forums",
    joinDiscussion: "Join Discussion",
    availableForums: "Available Forums",
    joinGroups: "Join specialized support groups",
    teens: "Teens (13-17)",
    children: "Children (8-12)",
    educators: "Educators",
    comingSoon: "Coming Soon",
    createAccount: "Create Account to Join",
    forumGuidelines: "Forum Guidelines",
    guidelinesDescription: "Rules for safe and supportive discussions",
    respectPrivacy: "Respect privacy and confidentiality of all members",
    beSupportive: "Be supportive and non-judgmental in all interactions",
    reportContent: "Report any concerning content to moderators",
    noPersonalInfo: "Do not share personal identifying information",
    childPsychologist: "Child Psychologist",
    available: "Available",
    specializedIn: "Specialized in child trauma and recovery",
    specializations: "Specializations:",
    traumaRecovery: "Trauma Recovery"
  },
  ar: {
    title: "منتدى الدعم",
    subtitle: "تواصل مع المستشارين وانضم إلى المنتديات المعتدلة للحصول على الدعم والتوجيه.",
    privacyTitle: "الخصوصية والسرية",
    privacyDescription: "جميع المحادثات في منتديات الدعم لدينا سرية. خصوصيتك هي أولويتنا.",
    privacyPolicy: "سياسة الخصوصية",
    supportForums: "منتديات الدعم",
    expertCounseling: "استشارة الخبراء",
    supportResources: "موارد الدعم",
    confidentialChatrooms: "غرف الدردشة السرية",
    chatroomsDescription: "منتديات معتدلة للآباء والأطفال لمناقشة القضايا الحساسة",
    parentsSupportGroup: "مجموعة دعم الآباء",
    active: "نشط",
    membersOnline: "أعضاء متصلون",
    typeMessage: "اكتب رسالتك...",
    messagesConfidential: "جميع الرسائل سرية وتخضع للإشراف من أجل السلامة.",
    viewOtherForums: "عرض المنتديات الأخرى",
    joinDiscussion: "انضم إلى المناقشة",
    availableForums: "المنتديات المتاحة",
    joinGroups: "انضم إلى مجموعات الدعم المتخصصة",
    teens: "المراهقون (13-17)",
    children: "الأطفال (8-12)",
    educators: "المعلمون",
    comingSoon: "قريباً",
    createAccount: "إنشاء حساب للانضمام",
    forumGuidelines: "إرشادات المنتدى",
    guidelinesDescription: "قواعد للمناقشات الآمنة والداعمة",
    respectPrivacy: "احترم خصوصية وسرية جميع الأعضاء",
    beSupportive: "كن داعماً وغير متحيز في جميع التفاعلات",
    reportContent: "بلغ عن أي محتوى مثير للقلق للمشرفين",
    noPersonalInfo: "لا تشارك المعلومات الشخصية",
    childPsychologist: "طبيب نفساني للأطفال",
    available: "متاح",
    specializedIn: "متخصص في صدمات الأطفال والتعافي",
    specializations: "التخصصات:",
    traumaRecovery: "التعافي من الصدمات"
  }
}

export default function SupportPage() {
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

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <Lock className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">{t.privacyTitle}</h3>
            <p className="text-muted-foreground">
              {t.privacyDescription}
            </p>
          </div>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            {t.privacyPolicy}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="forums" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4">
          <TabsTrigger value="forums">{t.supportForums}</TabsTrigger>
          <TabsTrigger value="counseling">{t.expertCounseling}</TabsTrigger>
          <TabsTrigger value="resources">{t.supportResources}</TabsTrigger>
        </TabsList>

        <TabsContent value="forums" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t.confidentialChatrooms}</CardTitle>
                  <CardDescription>
                    {t.chatroomsDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border rounded-md">
                    <div className="p-4 border-b bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-medium">{t.parentsSupportGroup}</h3>
                          <Badge className="ml-2">{t.active}</Badge>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          24 {t.membersOnline}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Jane Doe</span>
                            <span className="text-xs text-muted-foreground">2:45 PM</span>
                          </div>
                          <p className="text-sm bg-muted p-2 rounded-md">
                            I'm concerned about my child's behavior after they started a new school. Has anyone dealt
                            with similar issues?
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Mark Smith</span>
                            <Badge variant="outline" className="text-xs">
                              Moderator
                            </Badge>
                            <span className="text-xs text-muted-foreground">2:50 PM</span>
                          </div>
                          <p className="text-sm bg-muted p-2 rounded-md">
                            Hi Jane, many parents face similar challenges. Could you share more about the specific
                            behaviors you're noticing?
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Sarah Johnson</span>
                            <span className="text-xs text-muted-foreground">3:01 PM</span>
                          </div>
                          <p className="text-sm bg-muted p-2 rounded-md">
                            My son went through something similar last year. What helped us was maintaining open
                            communication and working with the school counselor.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input placeholder={t.typeMessage} className="flex-1" />
                        <Button size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t.messagesConfidential}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between mt-4">
                  <Button variant="outline" className="w-full sm:w-auto">{t.viewOtherForums}</Button>
                  <Button className="w-full sm:w-auto">{t.joinDiscussion}</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t.availableForums}</CardTitle>
                  <CardDescription>{t.joinGroups}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{t.parentsSupportGroup}</span>
                      </div>
                      <Badge>{t.active}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{t.teens}</span>
                      </div>
                      <Badge>{t.active}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{t.children}</span>
                      </div>
                      <Badge>{t.active}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{t.educators}</span>
                      </div>
                      <Badge variant="outline">{t.comingSoon}</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t.createAccount}</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t.forumGuidelines}</CardTitle>
                  <CardDescription>{t.guidelinesDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Wind className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>End-to-end encryption</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wind className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>Secure data storage</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wind className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>Privacy protection</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wind className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <span>Safe environment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="counseling" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{t.childPsychologist}</CardTitle>
                  <Badge className="bg-green-500">{t.available}</Badge>
                </div>
                <CardDescription>{t.specializedIn}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Dr. Rebecca Chen</h4>
                    <p className="text-sm text-muted-foreground">PhD, Child Psychology</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-xs text-muted-foreground">(48 reviews)</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">{t.specializations}:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {t.traumaRecovery}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
                <Button className="w-full">Schedule Session</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Family Therapist</CardTitle>
                  <Badge className="bg-green-500">Available</Badge>
                </div>
                <CardDescription>Focused on family dynamics and healing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Dr. James Miller</h4>
                    <p className="text-sm text-muted-foreground">LMFT, Family Therapy</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="text-xs text-muted-foreground">(36 reviews)</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Family Dynamics
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Parenting
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Communication
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
                <Button className="w-full">Schedule Session</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Child Advocate</CardTitle>
                  <Badge className="bg-amber-500">Busy</Badge>
                </div>
                <CardDescription>Legal and emotional support for children</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Sarah Adams</h4>
                    <p className="text-sm text-muted-foreground">JD, Child Advocacy</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-xs text-muted-foreground">(52 reviews)</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Legal Support
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Advocacy
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      System Navigation
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
                <Button className="w-full">Join Waitlist</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
                <MessageCircle className="h-10 w-10 text-blue-600" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-semibold">Emergency Support Available 24/7</h3>
                <p className="text-muted-foreground">
                  Our crisis counselors are available around the clock for urgent situations.
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto">Access Emergency Support</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Resources</CardTitle>
                <CardDescription>Helpful materials for families and children</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Coping Strategies for Children</h4>
                      <p className="text-xs text-muted-foreground">PDF guide with age-appropriate coping mechanisms</p>
                      <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Talking to Children About Abuse</h4>
                      <p className="text-xs text-muted-foreground">
                        Guide for parents on having difficult conversations
                      </p>
                      <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Recovery Journey Workbook</h4>
                      <p className="text-xs text-muted-foreground">Interactive workbook for healing and recovery</p>
                      <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Legal Rights Guide</h4>
                      <p className="text-xs text-muted-foreground">Understanding the legal process and your rights</p>
                      <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Resources
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Videos</CardTitle>
                <CardDescription>Educational videos on healing and recovery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <h4 className="font-medium">Understanding Trauma in Children</h4>
                <p className="text-sm text-muted-foreground">
                  This video explains how trauma affects children's development and behavior, and provides strategies
                  for support.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Next
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Video Library</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Local Support Services</CardTitle>
              <CardDescription>Find support services in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Enter your location..." className="pl-8" />
                  </div>
                  <Button>Find Services</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium">Children's Crisis Center</h4>
                      <p className="text-sm text-muted-foreground">123 Main St, Anytown</p>
                      <p className="text-sm">Phone: (555) 123-4567</p>
                      <Badge variant="outline" className="mt-2">
                        Crisis Support
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium">Family Support Network</h4>
                      <p className="text-sm text-muted-foreground">456 Oak Ave, Anytown</p>
                      <p className="text-sm">Phone: (555) 987-6543</p>
                      <Badge variant="outline" className="mt-2">
                        Family Services
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium">Child Advocacy Center</h4>
                      <p className="text-sm text-muted-foreground">789 Pine St, Anytown</p>
                      <p className="text-sm">Phone: (555) 456-7890</p>
                      <Badge variant="outline" className="mt-2">
                        Legal Support
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
