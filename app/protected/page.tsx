import { getProfileById } from "@/utils/data/profiles";
import { verifyUser } from "@/utils/data/database";

/**
 * ProtectedPage component - Displays the authenticated user's profile information.
 * @returns {JSX.Element} The rendered component.
 */
export default async function ProtectedPage() {
  // Verify if the user is authenticated
  const verifiedUser = await verifyUser();
  if (!verifiedUser) {
    throw new Error("User is not authenticated");
  }

  // Fetch the user's profile information
  const profile = await getProfileById(verifiedUser.id);

  return (
    <div>
      <h1>Welcome, {profile.username}!</h1>
      <p>Your progress is: {profile.progress}</p>
    </div>
  );
}
