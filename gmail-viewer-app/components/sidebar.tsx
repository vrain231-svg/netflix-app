"use client"

import React from 'react'
import { Button } from './ui/button'
import { 
  Archive, 
  Clock, 
  Inbox, 
  Mailbox, 
  Pencil, 
  SendHorizonal, 
  Trash 
} from 'lucide-react'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

export default function Sidebar() {
  const menuItems = [
    { icon: <Inbox className="h-5 w-5" />, label: 'Inbox', count: 24 },
    { icon: <SendHorizonal className="h-5 w-5" />, label: 'Sent', count: 0 },
    { icon: <Clock className="h-5 w-5" />, label: 'Snoozed', count: 3 },
    { icon: <Mailbox className="h-5 w-5" />, label: 'Drafts', count: 5 },
    { icon: <Archive className="h-5 w-5" />, label: 'Archive', count: 0 },
    { icon: <Trash className="h-5 w-5" />, label: 'Trash', count: 0 }
  ]

  return (
    <aside className="w-60 border-r h-[calc(100vh-73px)] hidden md:block">
      <div className="p-4">
        <Button className="w-full justify-start gap-2" size="lg">
          <Pencil className="h-4 w-4" />
          <span>Compose</span>
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100%-80px)]">
        <div className="px-2 py-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={index === 0 ? "secondary" : "ghost"}
              className="w-full justify-start mb-1 font-normal"
            >
              {item.icon}
              <span className="ml-2 flex-1 text-left">{item.label}</span>
              {item.count > 0 && (
                <span className="ml-2 text-xs bg-muted rounded-full px-2 py-1">
                  {item.count}
                </span>
              )}
            </Button>
          ))}
        </div>
        
        <Separator className="my-2" />
        
        <div className="px-4 py-2">
          <h3 className="text-sm font-medium mb-2">Labels</h3>
          <div className="space-y-1">
            {['Work', 'Personal', 'Travel', 'Finance'].map((label) => (
              <Button
                key={label}
                variant="ghost"
                className="w-full justify-start text-sm font-normal"
              >
                <span className="w-3 h-3 rounded-full bg-primary mr-2" style={{ 
                  backgroundColor: 
                    label === 'Work' ? 'hsl(var(--chart-1))' :
                    label === 'Personal' ? 'hsl(var(--chart-2))' :
                    label === 'Travel' ? 'hsl(var(--chart-3))' :
                    'hsl(var(--chart-4))'
                }}></span>
                {label}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}