import { getTable } from "./database";

export type Workout = {
    workout_id: number;
    profile_id: string;
    workout_name: string;
    description?: string;
    points?: number;
};

/**
 * Get a workout by its ID.
 * @param {number} workout_id - The ID of the workout.
 * @returns {Promise<Workout>} The workout data.
 */
export async function getWorkoutById(workout_id: number) {
    const table = await getTable("workouts");
    const request = await table.select().eq("workout_id", workout_id).single();
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workout");
    }
    return request.data;
}

/**
 * Get all workouts for a specific user.
 * @param {string} profile_id - The ID of the user.
 * @returns {Promise<Workout[]>} The list of workouts.
 */
export async function getWorkoutsForUser(profile_id: string): Promise<Workout[]> {
    const table = await getTable("workouts");
    const request = await table.select().eq("profile_id", profile_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workouts");
    }
    return request.data;
}

/**
 * Create a new workout for a user.
 * @param {string} profile_id - The ID of the user.
 * @param {string} workout_name - The name of the workout.
 * @param {string} [description] - The description of the workout.
 * @param {number} [points] - The progress points of the workout.
 * @returns {Promise<Workout>} The created workout.
 */
export async function createWorkout(profile_id: string, workout_name: string, description?: string, points?: number): Promise<Workout> {
    const table = await getTable("workouts");
    const newWorkout = {
        profile_id,
        workout_name,
        description,
        points,
    };

    const { data, error } = await table.insert(newWorkout).select();
    if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error("Unable to create workout");
    }

    if (!data || data.length === 0) {
        throw new Error("Workout creation returned no data");
    }

    return data[0];
}

/**
 * Update an existing workout.
 * @param {number} workout_id - The ID of the workout.
 * @param {string} workout_name - The name of the workout.
 * @param {string} [description] - The description of the workout.
 * @param {number} [points] - The progress points of the workout.
 * @returns {Promise<Workout>} The updated workout.
 */
export async function updateWorkout(workout_id: number, workout_name: string, description?: string, points?: number): Promise<Workout> {
    const table = await getTable("workouts");
    const updatedWorkout = {
        workout_name,
        description,
        points,
    };
    const request = await table.update(updatedWorkout).eq("workout_id", workout_id).select();
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to update workout");
    }
    if (request?.data?.[0] == null) {
        throw new Error("Unable to update workout");
    }
    return request.data[0];
}

/**
 * Delete a workout.
 * @param {number} workout_id - The ID of the workout.
 * @returns {Promise<void>}
 */
export async function deleteWorkout(workout_id: number): Promise<void> {
    const table = await getTable("workouts");
    const request = await table.delete().eq("workout_id", workout_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete workout");
    }
}
