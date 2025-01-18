"use client"
import { Imessage, useMessage } from '@/lib/store/messages'
import React, { useEffect } from 'react'
import Message from './Message'
import { createClient } from '@/utils/supabase/client'
import { useToast } from './ToastProvider'

export default function ListMessages() {
    const supabase = createClient()
    const {messages, optimisticIds, addMessage} = useMessage((state) => state)
    console.log( "those are optimisticids", optimisticIds);
    
    const {showToast} = useToast()
    
    useEffect(()=>{
        
        const channel = supabase
        .channel("chat-channel")
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, 
            async (payload) => {
                if (!optimisticIds.includes(payload.new.id)) {
                    const {error, data} = await supabase
                        .from("users")
                        .select("*")
                        .eq("id", payload.new.send_by)
                        .single();
                        
                        if(error){
                            showToast("",error.message)
                        }
                        else{
                            const newMessage = {
                                ...payload.new,
                                users:data
                            }
                            console.log('Adding message:', newMessage);
                            addMessage(newMessage as Imessage)
                        }
                    }
        })  
        .subscribe()
      
        return () => {
            channel.unsubscribe()
        }
    },[messages])

    return (
        <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
            <div className="flex-1">

            </div>
            <div className="space-y-7">
              {messages.map((value,index)=> {
                return (
                    <Message key={index} message={value}/>
                )
              })}
            
            </div>
          </div>
  )
}
