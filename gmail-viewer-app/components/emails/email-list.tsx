"use client"

import React, { useState } from 'react'
import { EmailListItem } from '@/types/gmail'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { format, isToday, isYesterday } from 'date-fns'
import { motion } from 'framer-motion'

interface EmailListProps {
  emails: EmailListItem[]
  selectedEmailId: string | null
  onEmailSelect: (emailId: string) => void
  isLoading: boolean
}

export default function EmailList({ 
  emails, 
  selectedEmailId, 
  onEmailSelect,
  isLoading
}: EmailListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-card rounded-md">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-4 w-[60px]" />
          </div>
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
    <div className="space-y-1">
      {emails.map((email) => (
        <motion.div
          key={email.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onEmailSelect(email.id)}
          className={cn(
            "flex items-start space-x-3 p-4 rounded-md cursor-pointer transition-all hover:bg-muted/50",
            selectedEmailId === email.id && "bg-muted",
            !email.isRead && "font-semibold"
          )}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center">
            {email.fromName.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <p className={cn("text-sm", !email.isRead && "font-semibold")}>
                {email.fromName}
              </p>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="text-xs text-muted-foreground">{formatDate(email.date)}</span>
              </div>
            </div>
            
            <p className={cn("text-sm font-medium truncate", !email.isRead && "font-semibold")}>
              {email.subject}
            </p>
            
            <p className="text-xs text-muted-foreground line-clamp-2">
              {email.snippet}
            </p>
          </div>
        </motion.div>
      ))}
      
      {emails.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No emails found</p>
        </div>
      )}
    </div>
  )
}