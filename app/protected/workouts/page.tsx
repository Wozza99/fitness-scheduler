import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getWorkoutsForUser } from "@/utils/data/workouts";
import Table from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function WorkoutsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const workouts = await getWorkoutsForUser(user.id);

  const columns = ["workout_name", "description", "points"];
  const columnNames = {
    workout_name: "Name",
    description: "Description",
    points: "Progress Points",
  };

  const customColumns = [
    {
      header: "Approved",
      render: () => "Yes"
    },
    {
      header: "Is it really?",
      render: () => "No :("
    }
  ];

  return (
    <div>
      <h1>Workouts</h1>
      <Table
        columns={columns}
        data={workouts}
        columnNames={columnNames}
        customColumns={customColumns}
      />
    </div>
  );
}