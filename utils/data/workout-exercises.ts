import { getTable } from "./database";
import { getExerciseById } from "./exercises";

export type WorkoutExercise = {
    workout_id: number;
    exercise_id: number;
    sets?: number;
    durationSeconds?: number;
    notes?: string;
};

export async function getWorkoutExercises(workout_id: number): Promise<WorkoutExercise[]> {
    const table = await getTable("workout_exercises");
    const request = await table.select().eq("workout_id", workout_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workout exercises");
    }
    return request.data;
}

// Get workout exercises for a workout with exercise names
export async function getWorkoutExercisesWithNames(workout_id: number): Promise<(WorkoutExercise & { exercise_name: string })[]> {
    const table = await getTable("workout_exercises");
    const request = await table.select().eq("workout_id", workout_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workout exercises");
    }

    const workoutExercises = request.data as WorkoutExercise[];
    
    // Fetch the exercise names for each exercise_id
    const results = await Promise.all(
        workoutExercises.map(async (workoutExercise) => {
            const exercise = await getExerciseById(workoutExercise.exercise_id);
            return {
                ...workoutExercise,
                exercise_name: exercise.exercise_name, // Add exercise_name to the object
            };
        })
    );

    return results;
}


// Create a new workout exercise
export async function createWorkoutExercise(workoutExercise: WorkoutExercise): Promise<WorkoutExercise> {
    const table = await getTable("workout_exercises");
    const { data, error } = await table.insert(workoutExercise).select();
    if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error("Unable to add workout exercise");
    }

    if (!data || data.length === 0) {
        throw new Error("Workout exercise creation returned no data");
    }

    return data[0];
}

// Update an existing workout exercise
export async function updateWorkoutExercise(workout_id: number, exercise_id: number, updates: Partial<WorkoutExercise>): Promise<WorkoutExercise> {
    const table = await getTable("workout_exercises");
    const request = await table.update(updates).match({ workout_id, exercise_id });
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to update workout exercise");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to update workout exercise');
    }
    return request.data[0];
}

// Delete a workout exercise
export async function deleteWorkoutExercise(workout_id: number, exercise_id: number): Promise<void> {
    const table = await getTable("workout_exercises");
    const request = await table.delete().match({ workout_id, exercise_id });
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete workout exercise");
    }
}