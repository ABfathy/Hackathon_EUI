'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen } from "lucide-react"
import { ForumReply } from "@/components/forum/forum-reply"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Lock, Users, Send, Wind, Info, Video, Search } from "lucide-react"
import { ForumSection } from "@/components/forum/forum-section"
import { ForumPost } from "@/components/forum/forum-post"

interface ForumSectionType {
  id: string
  name: string
  description: string
  type: "PARENTS_ONLY" | "TEENS_ONLY" | "BOTH"
  _count: {
    posts: number
  }
}

interface ForumPostType {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    userType: string
  }
  _count: {
    replies: number
  }
}

interface ForumReplyType {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    userType: string
  }
}

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
    traumaRecovery: "Trauma Recovery",
    createNewPost: "Create New Post",
    newPostTitle: "New Post Title",
    newPostContent: "Write your post content here...",
    submitPost: "Submit Post",
    replyToPost: "Reply to Post",
    writeReply: "Write your reply here...",
    submitReply: "Submit Reply",
    backToSections: "Back to Sections",
    backToPosts: "Back to Posts",
    postedBy: "Posted by",
    posts: "posts"
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
    traumaRecovery: "التعافي من الصدمات",
    createNewPost: "إنشاء منشور جديد",
    newPostTitle: "عنوان المنشور الجديد",
    newPostContent: "اكتب محتوى منشورك هنا...",
    submitPost: "نشر المنشور",
    replyToPost: "الرد على المنشور",
    writeReply: "اكتب ردك هنا...",
    submitReply: "إرسال الرد",
    backToSections: "العودة إلى الأقسام",
    backToPosts: "العودة إلى المنشورات",
    postedBy: "نشر بواسطة",
    posts: "منشورات"
  }
}

export default function SupportPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sections, setSections] = useState<ForumSectionType[]>([])
  const [selectedSection, setSelectedSection] = useState<ForumSectionType | null>(null)
  const [posts, setPosts] = useState<ForumPostType[]>([])
  const [selectedPost, setSelectedPost] = useState<ForumPostType | null>(null)
  const [replies, setReplies] = useState<ForumReplyType[]>([])
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newReplyContent, setNewReplyContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSections = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Define our predefined sections
      const predefinedSections: ForumSectionType[] = [
        {
          id: "parents-only",
          name: language === "en" ? "Parents Only Forum" : "منتدى الآباء فقط",
          description: language === "en" ? "A safe space for parents to discuss child safety concerns" : "مساحة آمنة للآباء لمناقشة مخاوف سلامة الأطفال",
          type: "PARENTS_ONLY",
          _count: {
            posts: 0
          }
        },
        {
          id: "teens-only",
          name: language === "en" ? "Teens Only Forum" : "منتدى المراهقين فقط",
          description: language === "en" ? "A supportive community for teens to share and support each other" : "مجتمع داعم للمراهقين للمشاركة ودعم بعضهم البعض",
          type: "TEENS_ONLY",
          _count: {
            posts: 0
          }
        },
        {
          id: "parents-and-teens",
          name: language === "en" ? "Parents & Teens Forum" : "منتدى الآباء والمراهقين",
          description: language === "en" ? "Collaborative space for families to discuss safety together" : "مساحة تعاونية للعائلات لمناقشة السلامة معًا",
          type: "BOTH",
          _count: {
            posts: 0
          }
        }
      ];
      
      // Filter sections based on user type
      const userType = session?.user?.userType;
      console.log("User type for section filtering:", userType);
      
      const filteredSections = predefinedSections.filter(section => {
        if (section.type === "BOTH") return true;
        if (section.type === "PARENTS_ONLY" && userType === "PARENT") return true;
        if (section.type === "TEENS_ONLY" && (userType === "CHILD" || userType === "INDEPENDENT_CHILD")) return true;
        return false;
      });
      
      setSections(filteredSections);
      
      // Also make an API call to get any existing posts for these sections
      const response = await fetch("/api/forum/sections")
      if (!response.ok) {
        throw new Error("Failed to fetch sections")
      }
      const data = await response.json()
      
      // We're just using the API to check if there are existing posts, not to get the sections themselves
      if (data && data.length > 0) {
        const updatedSections = filteredSections.map(section => {
          // Find all sections with the matching type and sum their post counts
          const matchingSections = data.filter((s: any) => s.type === section.type);
          if (matchingSections && matchingSections.length > 0) {
            // Sum up the post counts from all matching sections
            const totalPosts = matchingSections.reduce((total: number, s: any) => {
              return total + (s._count?.posts || 0);
            }, 0);
            
            console.log(`${section.name} post count: ${totalPosts}`);
            
            return {
              ...section,
              _count: {
                posts: totalPosts
              }
            };
          }
          return section;
        });
        setSections(updatedSections);
      }
      
    } catch (error) {
      console.error("Error setting up sections:", error)
      setError("Failed to load forum sections")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPosts = async (sectionId: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Map our predefined section ID to the section type for the API
      let sectionType = "";
      if (sectionId === "parents-only") {
        sectionType = "PARENTS_ONLY";
      } else if (sectionId === "teens-only") {
        sectionType = "TEENS_ONLY";
      } else if (sectionId === "parents-and-teens") {
        sectionType = "BOTH";
      }
      
      console.log(`Fetching posts for section: ${sectionId}, type: ${sectionType}`);
      
      // Always fetch by section type rather than section ID for our predefined forums
      const response = await fetch(`/api/forum/posts?sectionType=${sectionType}`)
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from posts API:", errorData);
        throw new Error(`Failed to fetch posts: ${errorData.error || response.statusText}`)
      }
      
      const data = await response.json()
      console.log(`Retrieved ${data.length} posts for section type ${sectionType}`);
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError("Failed to load posts")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchReplies = async (postId: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/forum/replies?postId=${postId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch replies")
      }
      const data = await response.json()
      setReplies(data)
    } catch (error) {
      console.error("Error fetching replies:", error)
      setError("Failed to load replies")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost || !newReplyContent) return

    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/forum/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newReplyContent,
          postId: selectedPost.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create reply")
      }

      // Reset form and reload replies
      setNewReplyContent("")
      fetchReplies(selectedPost.id)
    } catch (error) {
      console.error("Error creating reply:", error)
      setError("Failed to create reply")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchSections()
    }
  }, [status])

  // Auto-select section if sectionId is in query
  useEffect(() => {
    if (sections.length > 0) {
      const sectionId = searchParams.get("sectionId")
      console.log("Auto-selecting section:", sectionId);
      
      if (sectionId) {
        const found = sections.find(s => s.id === sectionId)
        if (found) {
          console.log("Found section:", found);
          setSelectedSection(found)
          fetchPosts(found.id)
        } else {
          console.log("Section not found in available sections");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, searchParams])

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
              <BookOpen className="h-5 w-5" />
              {language === "en" ? "Access Required" : "مطلوب تسجيل الدخول"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">{language === "en" 
              ? "Please sign in to access our support forums. These forums are only available to authenticated users to ensure a safe and supportive environment."
              : "يرجى تسجيل الدخول للوصول إلى منتديات الدعم الخاصة بنا. هذه المنتديات متاحة فقط للمستخدمين المصادق عليهم لضمان بيئة آمنة وداعمة."}</p>
            <Link href="/login">
              <Button className="w-full sm:w-auto">
                {language === "en" ? "Sign In" : "تسجيل الدخول"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedPost) {
    return (
      <div className="container mx-auto space-y-8 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setSelectedPost(null)}>
                {t.backToPosts}
              </Button>
              <CardTitle>{selectedPost.title}</CardTitle>
            </div>
            <CardDescription>
              {t.postedBy} {selectedPost.author.name} • {new Date(selectedPost.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p>{selectedPost.content}</p>
            </div>
            <Separator />
            <div className="space-y-4">
              {replies.map((reply) => (
                <ForumReply key={reply.id} {...reply} />
              ))}
            </div>
            <form onSubmit={handleCreateReply} className="space-y-4">
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder={t.writeReply}
                value={newReplyContent}
                onChange={(e) => setNewReplyContent(e.target.value)}
              />
              <Button type="submit">{t.submitReply}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
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

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.supportForums}</CardTitle>
              <CardDescription>
                {t.chatroomsDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedSection ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{selectedSection.name}</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setSelectedSection(null)}>{t.backToSections}</Button>
                      <Button onClick={() => {
                        // Map section ID to type
                        let sectionType = "";
                        if (selectedSection.id === "parents-only") {
                          sectionType = "PARENTS_ONLY";
                        } else if (selectedSection.id === "teens-only") {
                          sectionType = "TEENS_ONLY";
                        } else if (selectedSection.id === "parents-and-teens") {
                          sectionType = "BOTH";
                        }
                        router.push(`/support/create-post?sectionType=${sectionType}`)
                      }}>
                        {t.createNewPost}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <ForumPost
                        key={post.id}
                        {...post}
                        onClick={() => {
                          setSelectedPost(post)
                          fetchReplies(post.id)
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.map((section) => (
                    <ForumSection
                      key={section.id}
                      {...section}
                      onClick={() => {
                        setSelectedSection(section)
                        fetchPosts(section.id)
                      }}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.forumGuidelines}</CardTitle>
              <CardDescription>{t.guidelinesDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-gray-800 p-2 rounded-full">
                  <Info className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-sm">{t.respectPrivacy}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-gray-800 p-2 rounded-full">
                  <Info className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-sm">{t.beSupportive}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-gray-800 p-2 rounded-full">
                  <Info className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-sm">{t.reportContent}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-gray-800 p-2 rounded-full">
                  <Info className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-sm">{t.noPersonalInfo}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
