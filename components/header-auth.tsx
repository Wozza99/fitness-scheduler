import { signOutAction } from "@/utils/auth-util";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { getProfileById } from "@/utils/data/profiles";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  const profile = await getProfileById(user.id);

  return (
    <div className="flex items-center gap-4">
      Hey, {profile.username}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  );
}
