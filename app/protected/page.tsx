import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getProfileById } from "@/utils/data/profiles";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const profile = await getProfileById(user.id);

  return (
    <div>
      <h1>Welcome, {profile.username}!</h1>
      <p>Your progress is: {profile.progress}</p>
    </div>
  );
}
