import { getWorkoutsForUser, deleteWorkout, updateWorkout } from "@/utils/data/workouts";
import { verifyUser } from "@/utils/data/database";
import WorkoutsTable from "@/components/workout-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function WorkoutsPage() {
  const verifiedUser = await verifyUser();
  if (!verifiedUser) {
    throw new Error("User is not authenticated");
  }

  const workouts = await getWorkoutsForUser(verifiedUser.id);

  /**
   * Handles deleting an exercise from the database.
   */
  async function handleDelete(workout_id: number): Promise<{ success: boolean; error?: string }> {
    "use server";

    try {
      await deleteWorkout(workout_id);
      return { success: true }; // Explicitly return success.
    } catch (error) {
      console.error("Error deleting workout:", error);
      return { success: false, error: (error as Error).message }; // Explicitly return the error.
    }
  }


  /**
   * Updates an existing exercise in the workout.
   *
   * @param workout_id - The ID of the workout.
   * @param exercise_id - The ID of the exercise to update.
   * @param updates - The updates to apply to the exercise.
   */
  async function handleUpdate(
    workout_id: number,
    workout_name: string,
    description?: string,
    points?: number
  ): Promise<{ success: boolean; error?: string }> {
    "use server";

    try {
      await updateWorkout(workout_id, workout_name, description, points);
      return { success: true };
    } catch (error) {
      console.error("Error updating workout:", error);

      // Safely access the error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

      return { success: false, error: errorMessage };
    }
  }


  const columns = ["workout_name", "description", "points"];
  const columnNames = {
    workout_name: "Name",
    description: "Description",
    points: "Progress Points",
  };

  return (
    <div>
      <h1>Workouts</h1>
      <Button asChild size="sm" variant="outline">
        <Link href="workouts/add">Add Workout</Link>
      </Button>
      <WorkoutsTable
        workouts={workouts}
        columns={columns}
        columnNames={columnNames}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
