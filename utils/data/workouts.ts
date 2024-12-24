import { getTable } from "./database";

export type Workout = {
    workout_id: string;
    profile_id: string;
    points?: number;
    description?: string;
};

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
export async function createWorkout(profile_id: string, points?: number, description?: string): Promise<Workout> {
    const table = await getTable("workouts");
    const newWorkout = {
        profile_id,
        points,
        description,
    };

    const request = await table.insert(newWorkout);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to create workout");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to create workout');
    }
    return request.data[0];
}

// Update an existing workout
export async function updateWorkout(workout_id: string, points?: number, description?: string): Promise<Workout> {
    const table = await getTable("workouts");
    const updatedWorkout = {
        points,
        description,
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
export async function deleteWorkout(workout_id: string): Promise<void> {
    const table = await getTable("workouts");
    const request = await table.delete().eq("workout_id", workout_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete workout");
    }
}
