import { Button } from "@/components/ui/button";
import { deleteExercise, getExerciseById } from "@/utils/data/exercises";
import { redirect } from "next/navigation";

export default async function ExerciseDetailsPage({
  params,
}: {
  params: { exercise_id: number };
}) {
  const exercise = await getExerciseById(params.exercise_id);

  // Helper function to render instructions
  const renderInstructions = (instructions: string | null) => {
    if (!instructions || instructions.trim() === '') return <p>No instructions available.</p>;

    // Check if instructions contain multiple lines
    const lines = instructions.split('\n').filter((line) => line.trim() !== '');

    if (lines.length > 1) {
      // Render as an ordered list if there are multiple lines
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

  async function handleSubmit() {
    'use server';

    try {
      await deleteExercise(exercise.exercise_id);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to create exercise');
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
      {exercise.tips && exercise.tips.trim() !== '' && (
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
