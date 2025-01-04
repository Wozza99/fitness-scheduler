import { Button } from "@/components/ui/button";
import { deleteExercise, getExerciseById } from "@/utils/data/exercises";
import { redirect } from "next/navigation";

/**
 * ExerciseDetailsPage component - Displays details of a specific exercise.
 * @param {Object} params - The route parameters.
 * @param {number} params.exercise_id - The ID of the exercise.
 * @returns {JSX.Element} The rendered component.
 */
export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ exercise_id: number }>;
}) {
  const exerciseID = (await params).exercise_id;
  const exercise = await getExerciseById(exerciseID);

  /**
   * Renders the instructions as an ordered list or plain text.
   * @param {string | null} instructions - The instructions text.
   * @returns {JSX.Element} The rendered instructions.
   */
  const renderInstructions = (instructions: string | null) => {
    if (!instructions || instructions.trim() === "") return <p>No instructions available.</p>;

    const lines = instructions.split("\n").filter((line) => line.trim() !== "");

    // Render as an ordered list if there are multiple lines
    if (lines.length > 1) {
      return (
        <ol>
          {lines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ol>
      );
    }

    // Render as plain text if it's a single line
    return <p>{instructions}</p>;
  };

  /**
   * Handles the form submission to delete the exercise.
   */
  async function handleSubmit() {
    "use server";

    try {
      await deleteExercise(exercise.exercise_id);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete exercise");
    }
    return redirect("/protected/exercises");
  }

  return (
    <div>
      <h1>{exercise.exercise_name}</h1>
      <br />
      <h2>Instructions</h2>
      {renderInstructions(exercise.instructions)}
      <br />
      {exercise.tips && exercise.tips.trim() !== "" && (
        <>
          <h2>Tips</h2>
          <p>{exercise.tips}</p>
        </>
      )}
      <form action={handleSubmit}>
        <Button type="submit" variant={"outline"}>
          Delete Exercise
        </Button>
      </form>
    </div>
  );
}
