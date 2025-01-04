import { getTable } from "./database";
import { getExerciseById } from "./exercises";

export type WorkoutExercise = {
    workout_id: number;
    exercise_id: number;
    sets?: number;
    reps?: number;
    duration_seconds?: number;
    notes?: string;
};

/**
 * Get all exercises for a specific workout.
 * @param {number} workout_id - The ID of the workout.
 * @returns {Promise<WorkoutExercise[]>} The list of workout exercises.
 */
export async function getWorkoutExercises(workout_id: number): Promise<WorkoutExercise[]> {
    const table = await getTable("workout_exercises");
    const request = await table.select().eq("workout_id", workout_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workout exercises");
    }
    return request.data;
}

/**
 * Get workout exercises for a workout with exercise names.
 * @param {number} workout_id - The ID of the workout.
 * @returns {Promise<(WorkoutExercise & { exercise_name: string })[]>} The list of workout exercises with names.
 */
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
                exercise_name: exercise.exercise_name,
            };
        })
    );

    return results;
}

/**
 * Create a new workout exercise.
 * @param {WorkoutExercise} workoutExercise - The workout exercise data.
 * @returns {Promise<WorkoutExercise>} The created workout exercise.
 */
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

/**
 * Update an existing workout exercise.
 * @param {number} workout_id - The ID of the workout.
 * @param {number} exercise_id - The ID of the exercise.
 * @param {Partial<WorkoutExercise>} updates - The updates to apply.
 * @returns {Promise<WorkoutExercise>} The updated workout exercise.
 */
export async function updateWorkoutExercise(workout_id: number, exercise_id: number, updates: Partial<WorkoutExercise>): Promise<WorkoutExercise> {
    const table = await getTable("workout_exercises");
    const request = await table.update(updates).match({ workout_id, exercise_id }).select();
    if (request.error != null) {
        console.error("Supabase Error:", request.error);
        throw new Error("Unable to update workout exercise");
    }
    if (request?.data?.[0] == null) {
        throw new Error("Unable to update workout exercise");
    }
    return request.data[0];
}

/**
 * Delete a workout exercise.
 * @param {number} workout_id - The ID of the workout.
 * @param {number} exercise_id - The ID of the exercise.
 * @returns {Promise<void>}
 */
export async function deleteWorkoutExercise(workout_id: number, exercise_id: number): Promise<void> {
    const table = await getTable("workout_exercises");
    const request = await table.delete().match({ workout_id, exercise_id });
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete workout exercise");
    }
}