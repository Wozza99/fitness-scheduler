import { getProfileById } from "@/utils/data/profiles";
import { verifyUser } from "@/utils/data/database";

export default async function ProtectedPage() {
  const verifiedUser = await verifyUser();
  if (!verifiedUser) {
    throw new Error("User is not authenticated");
  }

  const profile = await getProfileById(verifiedUser.id);

  return (
    <div>
      <h1>Welcome, {profile.username}!</h1>
      <p>Your progress is: {profile.progress}</p>
    </div>
  );
}
