import { deleteWorkout, getWorkoutsForUser } from "@/utils/data/workouts";
import Table from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { verifyUser } from "@/utils/data/database";
import Link from "next/link";

/**
 * WorkoutsPage component - Displays a list of workouts for the authenticated user.
 * @returns {JSX.Element} The rendered component.
 */
export default async function WorkoutsPage() {
  // Verify if the user is authenticated
  const verifiedUser = await verifyUser();
  if (!verifiedUser) {
    throw new Error("User is not authenticated");
  }

  // Fetch workouts for the authenticated user
  const workouts = await getWorkoutsForUser(verifiedUser.id);

  // Define columns for the table
  const columns = ["workout_name", "description", "points"];
  const columnNames = {
    workout_name: "Name",
    description: "Description",
    points: "Progress Points",
  };

  // Define custom columns for additional view, edit and delete actions
  const customColumns = [
    {
      header: "View",
      render: (row: { [key: string]: any }) => (
        <Button asChild size="sm" variant={"outline"}>
          <Link href={`/protected/workouts/${row.workout_id}`}>View</Link>
        </Button>
      ),
    },
    /* {
      header: "Delete",
      render: (row: { [key: string]: any }) => (
        <Button
          size="sm"
          variant={"outline"}
          onClick={async () => {
            try {
              await deleteWorkout(row.workout_id);
              // Optionally, you can refresh the page or update the state to reflect the deletion
              window.location.reload();
            } catch (error) {
              console.error("Failed to delete workout:", error);
            }
          }}
        >
          Delete
        </Button>
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