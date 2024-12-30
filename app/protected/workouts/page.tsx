import { deleteWorkout, getWorkoutsForUser } from "@/utils/data/workouts";
import Table from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { verifyUser } from "@/utils/data/database";
import Link from "next/link";

export default async function WorkoutsPage() {
  const verifiedUser = await verifyUser();
  if (!verifiedUser) {
    throw new Error("User is not authenticated");
  }

  const workouts = await getWorkoutsForUser(verifiedUser.id);

  const columns = ["workout_name", "description", "points"];
  const columnNames = {
    workout_name: "Name",
    description: "Description",
    points: "Progress Points",
  };

  const customColumns = [
    {
      header: "View",
      render: (row) => (
        <Button asChild size="sm" variant={"outline"}>
            <Link href={`/protected/workouts/${row.workout_id}`}>View</Link>
        </Button>
      ),
    },
/*     {
      header: "Delete",
      render: (row) => (
        <form action={deleteWorkout(row.workout_id)}>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => deleteWorkout(row.workout_id)}
          >
            Delete
          </Button>
        </form>
      ),
    } */
  ];

  return (
    <div>
      <h1>Workouts</h1>
      <Button asChild size="sm" variant={"outline"}>
        <Link href="workouts/add">Add Workout</Link>
      </Button>
      <Table
        columns={columns}
        data={workouts}
        columnNames={columnNames}
        customColumns={customColumns}
      />
    </div>
  );
}