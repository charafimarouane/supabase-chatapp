import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export type Imessage = {
    created_at: string;
    id: string;
    is_edit: boolean;
    send_by: string;
    text: string | null;
    users: {
        avatar_url: string | null;
        created_at: string;
        display_name: string | null;
        id: string;
    };
}

interface MessageState {
    messages: Imessage[],
    addMessage: (message: Imessage) => void,
    optimisticIds: string[],
    setOptimisticIds: (id: string) => void
}

export const useMessage = create<MessageState>()((set) => ({
    messages: [],
    optimisticIds: [],
    setOptimisticIds: (id: string) =>
		set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
    addMessage: (newMessage)=>
        set((state) => ({
            messages: [...state.messages, newMessage]
        })),

}))