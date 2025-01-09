import { createWorkout } from "@/utils/data/workouts";
import { verifyUser } from "@/utils/data/database";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

/**
 * NewWorkoutPage component - Form to create a new workout.
 * @returns {JSX.Element} The rendered component.
 */
export default async function NewWorkoutPage() {
  /**
   * Handles the form submission to create a new workout.
   * @param {FormData} formData - The form data.
   */
  async function handleSubmit(formData: FormData) {
    "use server";

    // Verify if the user is authenticated
    const verifiedUser = await verifyUser();
    if (!verifiedUser) {
      throw new Error("Unable to fetch user information");
    }

    // Extract form data
    const userid = verifiedUser.id;
    const workout_name = formData.get("workout_name") as string;
    const description = formData.get("description") as string;
    const points = Number(formData.get("points") as unknown as string);

    // Validate required fields
    if (!userid || !workout_name) {
      throw new Error("Missing user_id or workout_name");
    }

    // Create a new workout from the form data
    try {
      await createWorkout(userid, workout_name, description, points);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create workout");
    }
    return redirect("/protected/workouts");
  }

  return (
    <div>
      <form action={handleSubmit}>
        <h1>Create a New Workout</h1>
        <Label htmlFor="workout_name">Workout Name:</Label><br />
        <Input id="workout_name" name="workout_name" required /><br />

        <Label htmlFor="description">Description:</Label><br />
        <textarea
          id="description"
          name="description"
          className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        /><br />

        <Label htmlFor="points">Progress Points:</Label><br />
        <Input type="number" id="points" name="points" /><br />

        <div className="flex space-x-2 mt-4">
          <Button type="submit" variant={"ghost"}>
            Create Workout
          </Button>

          <Button asChild variant={"outline"}>
            <Link href="/protected/workouts">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>

  );
}