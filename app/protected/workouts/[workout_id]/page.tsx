import { Button } from "@/components/ui/button";
import { deleteWorkout, getWorkoutById } from "@/utils/data/workouts";
import {
    getWorkoutExercisesWithNames,
    createWorkoutExercise,
    deleteWorkoutExercise,
    updateWorkoutExercise,
    WorkoutExercise,
} from "@/utils/data/workout-exercises";
import { getExercisesForUser } from "@/utils/data/exercises";
import { redirect } from "next/navigation";
import { WorkoutExerciseTable } from "@/components/workout-exercise-forms";
import Link from "next/link";

/**
 * Renders the details of a specific workout, including its description,
 * progress points, and associated exercises.
 *
 * @param params - Parameters containing the `workout_id` from the URL.
 * @returns The workout details page.
 */
export default async function WorkoutDetailsPage({
    params,
}: {
    params: Promise<{ workout_id: number }>;
}) {
    // Extract workout ID from the route parameters
    const workoutID = (await params).workout_id;

    // Fetch workout details and exercises
    const workout = await getWorkoutById(workoutID);
    const exercises = await getExercisesForUser(workout.profile_id);

    /**
     * Renders the workout's description. If the description contains multiple lines,
     * it displays them as a list; otherwise, it shows a single paragraph.
     *
     * @param description - The workout description.
     * @returns A JSX element displaying the description.
     */
    const renderDescription = (description: string | null) => {
        if (!description || description.trim() === "") {
            return <p>No description available.</p>;
        }

        // Split the description into lines and remove empty ones
        const lines = description.split("\n").filter((line) => line.trim() !== "");

        // Render as a list if there are multiple lines
        if (lines.length > 1) {
            return (
                <ol>
                    {lines.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ol>
            );
        }

        // Render as plain text if it's a single line
        return <p>{description}</p>;
    };

    // Fetch workout-specific exercises with names
    const workoutExercises = await getWorkoutExercisesWithNames(workoutID);

    /**
     * Handles deletion of the current workout and redirects to the workouts list.
     */
    async function handleSubmit() {
        "use server";

        try {
            await deleteWorkout(workout.workout_id);
        } catch (error) {
            console.error("Error deleting workout:", error);
            throw new Error("Unable to delete workout");
        }

        return redirect("/protected/workouts");
    }

    /**
     * Adds a new exercise to the workout.
     *
     * @param newExercise - The new exercise details to be added.
     */
    async function handleAddExercise(newExercise: Partial<WorkoutExercise>) {
        "use server";

        try {
            await createWorkoutExercise({
                workout_id: workoutID,
                exercise_id: 0, // Placeholder; actual ID should be provided
                ...newExercise,
            });
        } catch (error) {
            console.error("Error saving new exercise:", error);
        }

        return redirect(`/protected/workouts/${workoutID}`);
    }

    /**
     * Deletes an exercise from the workout.
     *
     * @param workout_id - The ID of the workout.
     * @param exercise_id - The ID of the exercise to delete.
     */
    async function handleDeleteExercise(workout_id: number, exercise_id: number) {
        "use server";

        try {
            await deleteWorkoutExercise(workout_id, exercise_id);
        } catch (error) {
            console.error("Error deleting exercise:", error);
        }

        return redirect(`/protected/workouts/${workoutID}`);
    }

    /**
     * Updates an existing exercise in the workout.
     *
     * @param workout_id - The ID of the workout.
     * @param exercise_id - The ID of the exercise to update.
     * @param updates - The updates to apply to the exercise.
     */
    async function handleUpdateExercise(
        workout_id: number,
        exercise_id: number,
        updates: Partial<WorkoutExercise>
    ) {
        "use server";

        try {
            await updateWorkoutExercise(workout_id, exercise_id, updates);
        } catch (error) {
            console.error("Error updating exercise:", error);
        }

        return redirect(`/protected/workouts/${workoutID}`);
    }

    // Render the workout details page
    return (
        <div>
            <h1>{workout.workout_name}</h1>
            <br />
            <h2>Description</h2>
            {renderDescription(workout.description)}
            <br />
            {workout.points != null && (
                <>
                    <h2>Progress Points</h2>
                    <p>{workout.points}</p>
                </>
            )}
            <br />
            <h2>Exercises</h2>
            <WorkoutExerciseTable
                workoutID={workoutID}
                exercises={exercises}
                workoutExercises={workoutExercises}
                onAddExercise={handleAddExercise}
                onDeleteExercise={handleDeleteExercise}
                onUpdateExercise={handleUpdateExercise}
            />
            <form action={handleSubmit}>
                <Button type="submit" variant="ghost">
                    Delete Workout
                </Button>
                <Button asChild variant={"outline"}>
                    <Link href={`/protected/workouts/`}>Back</Link>
                </Button>
            </form>
        </div>
    );
}
