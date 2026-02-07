"use client"

import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Mail, Menu, Search, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold">Gmail Viewer</h1>
        </div>
      </div>
      
      <div className="hidden md:flex flex-1 max-w-xl mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search in emails" 
            className="pl-10 w-full bg-secondary border-none" 
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}