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
      <h1>Protected Page</h1>
      <p>Welcome, {profile.username}!</p>
      <p>Your progress is: {profile.progress}</p>
    </div>
  );
}
