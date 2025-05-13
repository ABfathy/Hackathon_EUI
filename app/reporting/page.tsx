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
import { AlertTriangle, CheckCircle, Clock, ExternalLink, FileText, Info, Phone, Shield } from "lucide-react"

export default function ReportingPage() {
  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Reporting & Monitoring <span className="text-emerald-600 text-xl">(الإبلاغ والمراقبة)</span>
        </h1>
        <p className="text-muted-foreground">
          Report incidents anonymously and access real-time monitoring and alert systems.
        </p>
      </div>

      <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <Phone className="h-10 w-10 text-red-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">Emergency Hotline</h3>
            <p className="text-muted-foreground">
              For immediate assistance in emergency situations, please call the national child protection hotline.
            </p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Call 1-800-422-4453</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="report">Report Incident</TabsTrigger>
          <TabsTrigger value="alerts">Alert System</TabsTrigger>
          <TabsTrigger value="guide">Reporting Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Anonymous Incident Report</CardTitle>
              <CardDescription>
                Your information will be kept confidential. You can choose to remain anonymous.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Type of Incident</Label>
                <RadioGroup defaultValue="physical">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="physical" id="physical" />
                      <Label htmlFor="physical">Physical Abuse</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="emotional" id="emotional" />
                      <Label htmlFor="emotional">Emotional Abuse</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sexual" id="sexual" />
                      <Label htmlFor="sexual">Sexual Abuse</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="neglect" id="neglect" />
                      <Label htmlFor="neglect">Neglect</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, neighborhood, or specific location" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident</Label>
                <Textarea id="description" placeholder="Please provide as much detail as possible" rows={5} />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Your Contact Information (Optional)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Name (Optional)" />
                  <Input placeholder="Phone or Email (Optional)" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Submit Report</Button>
              <p className="text-xs text-muted-foreground text-center">
                By submitting this report, you confirm that the information provided is true to the best of your
                knowledge.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Real-time notifications and alerts in your area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">High Priority Alert</h4>
                        <Badge variant="destructive" className="text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-sm">
                        Suspicious individual reported near Central Elementary School. Authorities have been notified.
                      </p>
                      <p className="text-xs text-muted-foreground">May 13, 2025 - 2:45 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Community Notice</h4>
                      </div>
                      <p className="text-sm">
                        Increased reports of online solicitation targeting teenagers in the area. Please monitor
                        children's online activities.
                      </p>
                      <p className="text-xs text-muted-foreground">May 12, 2025 - 10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Resolved</h4>
                      </div>
                      <p className="text-sm">
                        Missing child alert from Downtown area has been resolved. Child has been safely reunited with
                        family.
                      </p>
                      <p className="text-xs text-muted-foreground">May 10, 2025 - 5:15 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
                <CardDescription>Customize your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text message alerts</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Alert Radius</Label>
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
                <Button className="w-full">Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Reporting Guide</CardTitle>
              <CardDescription>How to report incidents to authorities or emergency services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-medium">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Assess the Situation</h4>
                    <p className="text-sm text-muted-foreground">
                      Determine if the child is in immediate danger. If so, call emergency services immediately at 911.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-medium">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Gather Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Collect as much information as possible about the incident, including location, time, and
                      individuals involved.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-medium">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Contact Authorities</h4>
                    <p className="text-sm text-muted-foreground">
                      Report to local child protective services or law enforcement. You can use our platform to file an
                      anonymous report.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600 font-medium">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Follow Up</h4>
                    <p className="text-sm text-muted-foreground">
                      If you provided contact information, authorities may reach out for additional details. Stay
                      available for follow-up questions.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Important Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    National Child Abuse Hotline
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Child Protective Services
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Legal Resources
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Online Reporting Portal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
