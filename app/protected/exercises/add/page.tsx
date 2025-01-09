import { createExercise } from "@/utils/data/exercises";
import { verifyUser } from "@/utils/data/database";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

/**
 * NewExercisePage component - Form to create a new exercise.
 * @returns {JSX.Element} The rendered component.
 */
export default async function NewExercisePage() {
  /**
   * Handles the form submission to create a new exercise.
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
    const exercise_name = formData.get("exercise_name") as string;
    const instructions = formData.get("instructions") as string;
    const tips = formData.get("tips") as string;

    // Validate required fields
    if (!userid || !exercise_name) {
      throw new Error("Missing user_id or exercise_name");
    }

    // Create a new exercise from the form data
    try {
      await createExercise(userid, exercise_name, instructions, tips);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to create exercise");
    }
    return redirect("/protected/exercises");
  }

  return (
    <div>
      <h1>Create a New Exercise</h1>
      <form action={handleSubmit}>
        <Label htmlFor="exercise_name">Exercise Name:</Label><br />
        <Input id="exercise_name" name="exercise_name" required /><br />

        <Label htmlFor="instructions">Instructions:</Label><br />
        <textarea id="instructions" name="description" className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /><br />

        <Label htmlFor="tips">Tips:</Label><br />
        <textarea id="tips" name="tips" className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" /><br />

        <div className="flex space-x-2 mt-4">
          <Button type="submit" variant={"ghost"}>
            Create Exercise
          </Button>

          <Button asChild variant={"outline"}>
            <Link href="/protected/exercises">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
