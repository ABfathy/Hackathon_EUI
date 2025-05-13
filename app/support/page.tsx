import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Lock, Users, Send, Shield, Info, Video, Search } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Support Forum <span className="text-emerald-600 text-xl">(منتدى الدعم)</span>
        </h1>
        <p className="text-muted-foreground">
          Connect with counselors and join moderated forums for support and guidance.
        </p>
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <Lock className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">Privacy & Confidentiality</h3>
            <p className="text-muted-foreground">
              All conversations in our support forums are confidential. Your privacy is our priority.
            </p>
          </div>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Privacy Policy
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="forums" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forums">Support Forums</TabsTrigger>
          <TabsTrigger value="counseling">Expert Counseling</TabsTrigger>
          <TabsTrigger value="resources">Support Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="forums" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Confidential Chatrooms</CardTitle>
                  <CardDescription>
                    Moderated forums for parents and children to discuss sensitive issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border rounded-md">
                    <div className="p-4 border-b bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-medium">Parents Support Group</h3>
                          <Badge className="ml-2">Active</Badge>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          24 members online
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
                            <Badge variant="outline" size="sm" className="text-xs">
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
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        All messages are confidential and moderated for safety.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between mt-4">
                  <Button variant="outline">View Other Forums</Button>
                  <Button>Join Discussion</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Available Forums</CardTitle>
                  <CardDescription>Join specialized support groups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">Parents Support</span>
                      </div>
                      <Badge>Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Teens (13-17)</span>
                      </div>
                      <Badge>Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Children (8-12)</span>
                      </div>
                      <Badge>Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Educators</span>
                      </div>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Create Account to Join</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Forum Guidelines</CardTitle>
                  <CardDescription>Rules for safe and supportive discussions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <p className="text-sm">Respect privacy and confidentiality of all members</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <p className="text-sm">Be supportive and non-judgmental in all interactions</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <p className="text-sm">Report any concerning content to moderators</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-emerald-600 mt-0.5" />
                      <p className="text-sm">Do not share personal identifying information</p>
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
                  <CardTitle className="text-lg">Child Psychologist</CardTitle>
                  <Badge className="bg-green-500">Available</Badge>
                </div>
                <CardDescription>Specialized in child trauma and recovery</CardDescription>
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
                  <h4 className="text-sm font-medium">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Trauma Recovery
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Anxiety
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Behavioral Issues
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
                <Button className="flex-1">Schedule Session</Button>
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
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
                <Button className="flex-1">Schedule Session</Button>
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
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
                <Button className="flex-1">Join Waitlist</Button>
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
              <Button className="bg-red-600 hover:bg-red-700 text-white">Access Emergency Support</Button>
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
