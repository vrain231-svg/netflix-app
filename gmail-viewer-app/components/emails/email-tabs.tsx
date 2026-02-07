"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCallback, useEffect, useState } from "react"
import { EmailDetail, EmailListItem } from "@/types/gmail"
import EmailList from "./email-list"
import EmailDetailView from "./email-detail"
import { Briefcase, Inbox, MailWarning, MessageSquare, ShoppingCart } from "lucide-react"

export default function EmailTabs() {
  const [selectedTab, setSelectedTab] = useState<string>("primary")
  const [emails, setEmails] = useState<EmailListItem[]>([])
  const [filteredEmails, setFilteredEmails] = useState<EmailListItem[]>([])
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null)
  const [selectedEmail, setSelectedEmail] = useState<EmailDetail | null>(null)
  const [isLoadingEmails, setIsLoadingEmails] = useState(true)
  const [isLoadingEmailDetail, setIsLoadingEmailDetail] = useState(false)
  
  // Fetch emails
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoadingEmails(true)
        const response = await fetch('/api/emails')
        if (!response.ok) throw new Error('Failed to fetch emails')
        const data = await response.json()
        setEmails(data)
      } catch (error) {
        console.error('Error fetching emails:', error)
      } finally {
        setIsLoadingEmails(false)
      }
    }
    
    fetchEmails()
  }, [])
  
  // Filter emails based on selected tab
  useEffect(() => {
    setFilteredEmails(emails)
  }, [emails, selectedTab])
  
  // Fetch email detail when selected
  const handleEmailSelect = useCallback(async (emailId: string) => {
    if (emailId === selectedEmailId) return
    
    setSelectedEmailId(emailId)
    setIsLoadingEmailDetail(true)
    
    try {
      const response = await fetch(`/api/emails/${emailId}`)
      if (!response.ok) throw new Error('Failed to fetch email details')
      const data = await response.json()
      setSelectedEmail(data)
    } catch (error) {
      console.error('Error fetching email details:', error)
      setSelectedEmail(null)
    } finally {
      setIsLoadingEmailDetail(false)
    }
  }, [selectedEmailId])
  
  // Handle back button from detail view
  const handleBack = useCallback(() => {
    setSelectedEmailId(null)
    setSelectedEmail(null)
  }, [])
  
  return (
    <Tabs defaultValue="primary" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <TabsList className="grid grid-cols-5 mb-4">
        <TabsTrigger value="primary" className="flex items-center gap-2">
          <Inbox className="h-4 w-4" />
          <span className="hidden sm:inline">Primary</span>
        </TabsTrigger>
        <TabsTrigger value="social" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Social</span>
        </TabsTrigger>
        <TabsTrigger value="promotions" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Promotions</span>
        </TabsTrigger>
        <TabsTrigger value="updates" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Updates</span>
        </TabsTrigger>
        <TabsTrigger value="forums" className="flex items-center gap-2">
          <MailWarning className="h-4 w-4" />
          <span className="hidden sm:inline">Forums</span>
        </TabsTrigger>
      </TabsList>
      
      <div className="bg-card rounded-md border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-3 h-[calc(100vh-180px)]">
          <div className={`md:col-span-3 lg:col-span-1 border-r overflow-auto ${selectedEmailId ? 'hidden md:block' : ''}`}>
            <TabsContent value="primary" className="mt-0">
              <EmailList 
                emails={filteredEmails} 
                selectedEmailId={selectedEmailId}
                onEmailSelect={handleEmailSelect}
                isLoading={isLoadingEmails} 
              />
            </TabsContent>
            <TabsContent value="social" className="mt-0">
              <EmailList 
                emails={filteredEmails} 
                selectedEmailId={selectedEmailId}
                onEmailSelect={handleEmailSelect}
                isLoading={isLoadingEmails} 
              />
            </TabsContent>
            <TabsContent value="promotions" className="mt-0">
              <EmailList 
                emails={filteredEmails} 
                selectedEmailId={selectedEmailId}
                onEmailSelect={handleEmailSelect}
                isLoading={isLoadingEmails} 
              />
            </TabsContent>
            <TabsContent value="updates" className="mt-0">
              <EmailList 
                emails={filteredEmails} 
                selectedEmailId={selectedEmailId}
                onEmailSelect={handleEmailSelect}
                isLoading={isLoadingEmails} 
              />
            </TabsContent>
            <TabsContent value="forums" className="mt-0">
              <EmailList 
                emails={filteredEmails} 
                selectedEmailId={selectedEmailId}
                onEmailSelect={handleEmailSelect}
                isLoading={isLoadingEmails} 
              />
            </TabsContent>
          </div>
          
          <div className={`md:col-span-4 lg:col-span-2 overflow-auto ${!selectedEmailId ? 'hidden md:block' : ''}`}>
            <EmailDetailView 
              email={selectedEmail} 
              isLoading={isLoadingEmailDetail} 
              onBack={handleBack} 
            />
          </div>
        </div>
      </div>
    </Tabs>
  )
}