"use client"

import { User } from "@supabase/supabase-js"


export default function ChatHeader({user}:{user:User | undefined}) {
    
    return(
        <div className="h-20">
          <div className="p-5 border-b flex items-center justify-between h-full">
            <div>
              <h1 className="text-xl font-bold">Daily Chat</h1>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
                <h1 className="text-sm text-gray-400">online</h1>
              </div>
            </div>
          </div>
        </div>
    )
}