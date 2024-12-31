import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import { deleteWorkout, getWorkoutById } from "@/utils/data/workouts";
import { getWorkoutExercisesWithNames } from "@/utils/data/workout-exercises";
import { redirect } from "next/navigation";

export default async function WorkoutDetailsPage({
    params,
}: {
    params: Promise<{ workout_id: number }>;
}) {
    const workoutID = (await params).workout_id;
    const workout = await getWorkoutById(workoutID);

    // Helper function to render description
    const renderDescription = (description: string | null) => {
        if (!description || description.trim() === '') return <p>No description available.</p>;

        // Check if description contains multiple lines
        const lines = description.split('\n').filter((line) => line.trim() !== '');

        if (lines.length > 1) {
            // Render as an ordered list if there are multiple lines
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

    const workoutExercises = await getWorkoutExercisesWithNames(workoutID);

    const columns = ["exercise_name", "sets", "reps", "duration_seconds", "notes"];
    const columnNames = {
        exercise_name: "Name",
        sets: "Sets",
        reps: "Reps",
        duration_seconds: "Duration (Seconds)",
        notes: "Notes",
    };

    async function handleSubmit() {
        'use server';

        try {
            await deleteWorkout(workout.workout_id);
        } catch (error) {
            console.error(error);
            throw new Error('Unable to delete workout');
        }
        return redirect("/protected/workouts");
    }

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
            <Table
                columns={columns}
                data={workoutExercises}
                columnNames={columnNames}
            />
            <br />
            <form action={handleSubmit}>
                <Button type="submit" variant={"outline"}>
                    Delete Workout
                </Button>
            </form>
        </div>
    );
}
