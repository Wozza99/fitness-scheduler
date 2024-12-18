import { getTable } from "./database";

export type Workout = {
    id: string;
    created_at: string;
    user_id: string;
    data: any;
};

// Get workouts for a user
export async function getWorkoutsForUser(id: string): Promise<Workout[]> {
    const table = await getTable("workouts");
    const request = await table.select().eq("user_id", id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve workouts");
    }
    return request.data;
}

// Create a new workout for a user
export async function createWorkout(user_id: string, data: any): Promise<Workout> {
    const table = await getTable("workouts");
    const newWorkout = {
        user_id,
        data,
        created_at: new Date().toISOString(),
    };

    const request = await table.insert(newWorkout);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to create workout");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to create workout')
    }
    return request.data[0];
}

// Update an existing workout
export async function updateWorkout(id: string, data: any): Promise<Workout> {
    const table = await getTable("workouts");
    const request = await table.update({ data }).eq("id", id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to update workout");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to create workout')
    }
    return request.data[0];
}

// Delete a workout
export async function deleteWorkout(id: string): Promise<void> {
    const table = await getTable("workouts");
    const request = await table.delete().eq("id", id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete workout");
    }
}
