import EditableExercise from "@/components/edit-exercise-form";
import { deleteExercise, getExerciseById, updateExercise } from "@/utils/data/exercises";

export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ exercise_id: number }>;
}) {
  const exerciseID = (await params).exercise_id;
  const exercise = await getExerciseById(exerciseID);

  /**
   * Handles saving updated exercise data to the database.
   */
  async function handleSave(data: {
    exercise_id: number;
    profile_id: string;
    exercise_name: string;
    instructions: string | undefined;
    tips: string | undefined;
  }) {
    "use server";

    const { exercise_id, profile_id, exercise_name, instructions, tips } = data;

    try {
      await updateExercise(exercise_id, profile_id, exercise_name, instructions, tips);
    } catch (error) {
      console.error("Failed to update exercise:", error);
      throw new Error("Unable to save changes. Please try again.");
    }
  }

  /**
   * Handles deleting an exercise from the database.
   */
  async function handleDelete(exercise_id: number) {
    "use server";

    try {
      await deleteExercise(exercise_id);
    } catch (error) {
      console.error("Failed to delete exercise:", error);
      throw new Error("Unable to delete exercise. Please try again.");
    }
  }

  return (
    <div>
    <EditableExercise
      exercise={exercise}
      handleSave={handleSave}
      handleDelete={handleDelete}
    />
    </div>
  );
}