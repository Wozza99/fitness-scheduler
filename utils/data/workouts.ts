import { getTable } from "./database";

export type Workout = {
    workout_id: number;
    profile_id: string;
    workout_name: string;
    description?: string;
    points?: number;
};

// Get specified workout
export async function getWorkoutById(workout_id: number) {
    const table = await getTable("workouts");
    const request = await table.select().eq("workout_id", workout_id).single();
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workout");
    }
    return request.data;
}

// Get workouts for a user
export async function getWorkoutsForUser(profile_id: string): Promise<Workout[]> {
    const table = await getTable("workouts");
    const request = await table.select().eq("profile_id", profile_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workouts");
    }
    return request.data;
}

// Create a new workout for a user
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

// Update an existing workout
export async function updateWorkout(workout_id: number, workout_name: string, description?: string, points?: number): Promise<Workout> {
    const table = await getTable("workouts");
    const updatedWorkout = {
        workout_name,
        description,
        points,
    };
    const request = await table.update(updatedWorkout).eq("workout_id", workout_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to update workout");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to update workout');
    }
    return request.data[0];
}

// Delete a workout
export async function deleteWorkout(workout_id: number): Promise<void> {
    const table = await getTable("workouts");
    const request = await table.delete().eq("workout_id", workout_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete workout");
    }
}
