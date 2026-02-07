"use client"

import { EmailDetail } from '@/types/gmail'
import React from 'react'
import { format } from 'date-fns'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import { ArrowLeft, Download, Reply, Star, Trash } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { motion } from 'framer-motion'
import parse from 'html-react-parser'

interface EmailDetailViewProps {
  email: EmailDetail | null
  isLoading: boolean
  onBack: () => void
}

export default function EmailDetailView({ 
  email, 
  isLoading,
  onBack
}: EmailDetailViewProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-20" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-8 w-3/4" />
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <p className="text-lg font-medium mb-2">Select an email to view</p>
        <p className="text-sm text-muted-foreground">Choose an email from the list to see its contents</p>
      </div>
    )
  }

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d, yyyy h:mm a');
  }

  function extractBodyContent(html: string): string {
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    return match ? match[1] : html;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="flex justify-between items-center p-4 bg-card">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon">
            <Star className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Reply className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-auto">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold mb-4">{email.subject}</h1>
        </div>
        
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-semibold">
            {email.fromName.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="font-semibold">{email.fromName}</span>
                <span className="text-muted-foreground ml-2 text-sm">&lt;{email.from.split('<')[1]?.replace('>', '') || email.from}&gt;</span>
              </div>
              <span className="text-muted-foreground text-sm">
                {formatFullDate(email.date)}
              </span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {parse(extractBodyContent(email.body))}
        </div>
      </div>
    </motion.div>
  )
}