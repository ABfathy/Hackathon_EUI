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

export default function SecurityPage() {
  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Security & Privacy <span className="text-emerald-600 text-xl">(الأمان والخصوصية)</span>
        </h1>
        <p className="text-muted-foreground">
          Manage your security settings, privacy preferences, and account verification.
        </p>
      </div>

      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-amber-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">Security Reminder</h3>
            <p className="text-muted-foreground">
              Protecting your account helps safeguard sensitive information. We recommend enabling two-factor
              authentication.
            </p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">Enable 2FA</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Verification</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Verification</CardTitle>
              <CardDescription>Verify your identity to ensure a safe environment for all users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Verification</Label>
                    <p className="text-sm text-muted-foreground">Your email has been verified</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <UserCheck className="h-4 w-4" />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Phone Verification</Label>
                    <p className="text-sm text-muted-foreground">Verify your phone number for additional security</p>
                  </div>
                  <Button size="sm">Verify Now</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">ID Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Required for certain features and higher trust levels
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Upload ID
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Age Verification</h3>
                <p className="text-sm text-muted-foreground">
                  For child safety, we require age verification for accounts of children under 18. Parents or guardians
                  must complete this verification.
                </p>

                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <RadioGroup defaultValue="parent">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="parent" id="parent" />
                        <Label htmlFor="parent">Parent/Guardian Account</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="child" id="child" />
                        <Label htmlFor="child">Child Account (Under 18)</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>For Child Accounts</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Parent/Guardian Email" />
                    <Input placeholder="Parent/Guardian Phone" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send a verification link to the parent/guardian to approve this account.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Verification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control how your information is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Private</span>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Activity Tracking</Label>
                    <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve services</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Location Services</Label>
                    <p className="text-sm text-muted-foreground">Allow access to your location for local alerts</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="space-y-2">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Change Password</Label>
                    <div className="relative">
                      <Input id="password" type="password" placeholder="New password" />
                      <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Data Deletion</Label>
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm">Request deletion of all your data from our platform</p>
                    <Button variant="destructive" size="sm">
                      Request Deletion
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Consent Management</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I consent to the processing of my personal data as described in the Privacy Policy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing" className="text-sm">
                      I consent to receiving safety updates and educational materials via email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="research" />
                    <Label htmlFor="research" className="text-sm">
                      I consent to my anonymized data being used for research to improve child safety
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>Configure how the AI assistant interacts with you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable AI Assistant</Label>
                    <p className="text-sm text-muted-foreground">Turn the AI assistant on or off</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Voice Guidance</Label>
                    <p className="text-sm text-muted-foreground">Enable voice responses from the AI assistant</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Child-Friendly Mode</Label>
                    <p className="text-sm text-muted-foreground">Simplify language and content for younger users</p>
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
