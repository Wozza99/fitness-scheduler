import { signOutAction } from "@/utils/auth-util";
import Link from "next/link";
import { Button } from "./ui/button";
import { getProfileById } from "@/utils/data/profiles";
import { verifyUser } from "@/utils/data/database";

export default async function AuthButton() {
  const verifiedUser = await verifyUser(false);

  if (!verifiedUser) {
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

  const profile = await getProfileById(verifiedUser.id);

  return (
    <div className="flex items-center gap-4">
      Hey, {profile.username}!
      <form action={signOutAction}>
        <Button type="submit" variant={"ghost"}>
          Sign out
        </Button>
      </form>
    </div>
  );
}
