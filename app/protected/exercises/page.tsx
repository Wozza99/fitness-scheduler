import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getExercises } from "@/utils/data/exercises";

export default async function ExercisesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const exercises = await getExercises();

  return (
    <div>
      <h1>Exercises</h1>
      <table>
        <thead>
          <tr>
            <th>Exercise ID</th>
            <th>Exercise Name</th>
            <th>Instructions</th>
            <th>Tips</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.exercise_id}>
              <td>{exercise.exercise_id}</td>
              <td>{exercise.exercise_name}</td>
              <td>{exercise.instructions}</td>
              <td>{exercise.tips}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}