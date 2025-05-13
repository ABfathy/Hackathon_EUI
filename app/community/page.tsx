import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Bell, Video, FileText, Users, Search, Calendar, ExternalLink } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Community Awareness <span className="text-emerald-600 text-xl">(التوعية المجتمعية)</span>
        </h1>
        <p className="text-muted-foreground">Stay informed with local alerts and community awareness campaigns.</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by location or keyword..." className="pl-8" />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Label>
          <Switch id="notifications" />
        </div>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Local Alerts Map</TabsTrigger>
          <TabsTrigger value="campaigns">Education Campaigns</TabsTrigger>
          <TabsTrigger value="events">Community Events</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Safety Map</CardTitle>
              <CardDescription>View alerts and safety information in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col items-center justify-center p-6">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Interactive map showing alerts on known incidents and safety concerns in your area.
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">Map data would be displayed here</p>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Recent Alerts in Your Area</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Central Park Area</h4>
                        <Badge variant="destructive" className="text-xs">
                          High Risk
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Multiple reports of suspicious activity near playground
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Downtown Shopping Center</h4>
                        <Badge variant="outline" className="text-xs border-amber-500 text-amber-500">
                          Medium Risk
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Reports of individuals approaching unaccompanied minors
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">Riverside Elementary School</h4>
                        <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-500">
                          Safe Zone
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Increased security and safety measures implemented
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Filter Alerts</Button>
              <Button>Report New Concern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Know the Signs</CardTitle>
                  <Badge className="bg-emerald-500">Active</Badge>
                </div>
                <CardDescription>Educational campaign on recognizing abuse signs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  This campaign provides educational materials to help community members recognize the signs of child
                  abuse and neglect.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Materials
                </Button>
                <Button className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Join Campaign
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Safe Schools Initiative</CardTitle>
                  <Badge className="bg-emerald-500">Active</Badge>
                </div>
                <CardDescription>Creating safer educational environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  A collaborative effort between schools, parents, and community organizations to enhance safety in
                  educational settings.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Materials
                </Button>
                <Button className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Join Campaign
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Digital Safety for Families</CardTitle>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                <CardDescription>Protecting children in the digital world</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Launching next month, this campaign will focus on online safety, cyberbullying prevention, and
                  responsible digital citizenship.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" disabled className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Materials
                </Button>
                <Button disabled className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Get Notified
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
                <h3 className="text-xl font-semibold">Become a Community Ambassador</h3>
                <p className="text-muted-foreground">
                  Help spread awareness by becoming a SafeGuard community ambassador. Receive training and resources to
                  educate others.
                </p>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Apply Now</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Community Events</CardTitle>
                  <CardDescription>Join local events focused on child safety and protection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-md flex flex-col items-center justify-center text-emerald-600">
                        <span className="text-xs font-medium">MAY</span>
                        <span className="text-lg font-bold">20</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Child Safety Workshop</h4>
                        <p className="text-sm text-muted-foreground">Community Center, 10:00 AM - 2:00 PM</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Workshop
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Free
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-md flex flex-col items-center justify-center text-emerald-600">
                        <span className="text-xs font-medium">JUN</span>
                        <span className="text-lg font-bold">05</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Parent-Child Safety Day</h4>
                        <p className="text-sm text-muted-foreground">City Park, 9:00 AM - 4:00 PM</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Outdoor
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Family
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                      <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-md flex flex-col items-center justify-center text-emerald-600">
                        <span className="text-xs font-medium">JUN</span>
                        <span className="text-lg font-bold">15</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Digital Safety Seminar</h4>
                        <p className="text-sm text-muted-foreground">Public Library, 6:00 PM - 8:00 PM</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Seminar
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Online Option
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </CardFooter>
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
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <div className="font-medium">May 2025</div>
                  <Button variant="outline" size="sm">
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
