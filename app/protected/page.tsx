import ButtonToast from "@/components/ButtonToast";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import InitUser from "@/lib/store/InitUser";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col">
          <ChatHeader user={user}/>
          <ChatMessages/>
          <ChatInput/>
        </div>
      </div>
      <InitUser user={user}/>
    </>
  );
}
