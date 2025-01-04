import { createExercise } from "@/utils/data/exercises";
import { verifyUser } from "@/utils/data/database";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

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
        <label htmlFor="exercise_name">Exercise Name:</label><br />
        <input id="exercise_name" name="exercise_name" required /><br />

        <label htmlFor="instructions">Instructions:</label><br />
        <textarea id="instructions" name="instructions" /><br />

        <label htmlFor="tips">Tips:</label><br />
        <textarea id="tips" name="tips" /><br />

        <Button type="submit" variant={"outline"}>
          Create Exercise
        </Button>
      </form>
    </div>
  );
}
