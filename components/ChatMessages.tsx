import React, { Suspense } from 'react'
import ListMessages from './ListMessages'
import { createClient } from '@/utils/supabase/server'
import InitMessages from '@/lib/store/InitMessages'

export default async function ChatMessages() {
    const supabase = await createClient()
    const { data } = await supabase.from("messages").select('*,users(*)')
    
    
    return (
    <Suspense fallback={"loading..."} >

        <ListMessages/>
        <InitMessages messages={data || []}/>

    </Suspense>
  )
}
