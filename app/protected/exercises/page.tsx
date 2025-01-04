import { getExercisesForUser } from "@/utils/data/exercises";
import { verifyUser } from "@/utils/data/database";
import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * ExercisesPage component - Displays a list of exercises for the authenticated user.
 * @returns {JSX.Element} The rendered component.
 */
export default async function ExercisesPage() {
  // Verify if the user is authenticated
  const verifiedUser = await verifyUser();
  if (!verifiedUser) {
    throw new Error("User is not authenticated");
  }

  // Fetch exercises for the authenticated user
  const exercises = await getExercisesForUser(verifiedUser.id);

  // Map exercises to grid items
  const items = exercises.map(exercise => ({
    title: exercise.exercise_name,
    link: `/protected/exercises/${exercise.exercise_id}`
  }));

  return (
    <div>
      <h1>Exercises</h1>
      <Button asChild size="sm" variant={"ghost"}>
        <Link href="exercises/add">Add Exercise</Link>
      </Button>
      <Grid items={items} />
    </div>
  );
}