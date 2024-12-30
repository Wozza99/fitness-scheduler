import { Button } from "@/components/ui/button";
import { deleteExercise, getExerciseById } from "@/utils/data/exercises";
import { redirect } from "next/navigation";

interface ExerciseDetailsPageProps {
  params: { exercise_id: string }; // Use string for dynamic route parameters
}

export default async function ExerciseDetailsPage({
  params,
}: ExerciseDetailsPageProps) {
  const exerciseId = parseInt(params.exercise_id, 10); // Convert to number
  const exercise = await getExerciseById(exerciseId);

  const renderInstructions = (instructions: string | null) => {
    if (!instructions || instructions.trim() === "") return <p>No instructions available.</p>;

    const lines = instructions.split("\n").filter((line) => line.trim() !== "");

    if (lines.length > 1) {
      return (
        <ol>
          {lines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ol>
      );
    }

    return <p>{instructions}</p>;
  };

  async function handleSubmit() {
    "use server";

    try {
      await deleteExercise(exerciseId); // Use the converted `exerciseId`
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
