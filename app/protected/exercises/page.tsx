import { getExercisesForUser } from "@/utils/data/exercises";
import { verifyUser } from "@/utils/data/database";
import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ExercisesPage() {
  const verifiedUser = await verifyUser();
  if (!verifiedUser) {
    throw new Error("User is not authenticated");
  }

  const exercises = await getExercisesForUser(verifiedUser.id);

  const items = exercises.map(exercise => ({
    title: exercise.exercise_name,
    link: `/protected/exercises/${exercise.exercise_id}`
  }));

  return (
    <div>
      <h1>Exercises</h1>
        <Button asChild size="sm" variant={"outline"}>
          <Link href="exercises/add">Add Exercise</Link>
        </Button>
      <Grid items={items} />
    </div>
  );
}