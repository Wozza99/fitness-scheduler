import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getExercises } from "@/utils/data/exercises";
import Table from "@/components/ui/table";

export default async function ExercisesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const exercises = await getExercises();

  const columns = ["exercise_name", "instructions", "tips"];
  const columnNames = {
    exercise_name: "Name",
    instructions: "Instructions",
    tips: "Tips",
  };

  return (
    <div>
      <h1>Exercises</h1>
      <Table columns={columns} data={exercises} columnNames={columnNames} />
    </div>
  );
}