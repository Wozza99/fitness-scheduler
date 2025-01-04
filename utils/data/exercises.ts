import { getTable } from "./database";

export type Exercise = {
    exercise_id: number;
    profile_id: string;
    exercise_name: string;
    instructions?: string;
    tips?: string;
};

/**
 * Get an exercise by its ID.
 * @param {number} exercise_id - The ID of the exercise.
 * @returns {Promise<Exercise>} The exercise data.
 */
export async function getExerciseById(exercise_id: number) {
    const table = await getTable("exercises");
    const request = await table.select().eq("exercise_id", exercise_id).single();
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve exercise");
    }
    return request.data;
}

/**
 * Get all exercises for a specific user.
 * @param {string} profile_id - The ID of the user.
 * @returns {Promise<Exercise[]>} The list of exercises.
 */
export async function getExercisesForUser(profile_id: string): Promise<Exercise[]> {
    const table = await getTable("exercises");
    const request = await table.select().eq("profile_id", profile_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve exercises");
    }
    return request.data;
}

/**
 * Create a new exercise for a user.
 * @param {string} profile_id - The ID of the user.
 * @param {string} exercise_name - The name of the exercise.
 * @param {string} [instructions] - The instructions for the exercise.
 * @param {string} [tips] - The tips for the exercise.
 * @returns {Promise<Exercise>} The created exercise.
 */
export async function createExercise(profile_id: string, exercise_name: string, instructions?: string, tips?: string): Promise<Exercise> {
    const table = await getTable("exercises");
    const newExercise = {
        profile_id,
        exercise_name,
        instructions,
        tips,
    };

    const { data, error } = await table.insert(newExercise).select();
    if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error("Unable to create exercise");
    }

    if (!data || data.length === 0) {
        throw new Error("Exercise creation returned no data");
    }

    return data[0];
}

/**
 * Update an existing exercise.
 * @param {number} exercise_id - The ID of the exercise.
 * @param {string} profile_id - The ID of the user.
 * @param {string} exercise_name - The name of the exercise.
 * @param {string} [instructions] - The instructions for the exercise.
 * @param {string} [tips] - The tips for the exercise.
 * @returns {Promise<Exercise>} The updated exercise.
 */
export async function updateExercise(exercise_id: number, profile_id: string, exercise_name: string, instructions?: string, tips?: string): Promise<Exercise> {
    const table = await getTable("exercises");
    const updatedExercise = {
        profile_id,
        exercise_name,
        instructions,
        tips,
    };
    const request = await table.update(updatedExercise).eq("exercise_id", exercise_id).select();
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to update exercise");
    }
    if (request?.data?.[0] == null) {
        throw new Error("Unable to update exercise");
    }
    return request.data[0];
}

/**
 * Delete an exercise.
 * @param {number} exercise_id - The ID of the exercise.
 * @returns {Promise<void>}
 */
export async function deleteExercise(exercise_id: number): Promise<void> {
    const table = await getTable("exercises");
    const request = await table.delete().eq("exercise_id", exercise_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete exercise");
    }
}