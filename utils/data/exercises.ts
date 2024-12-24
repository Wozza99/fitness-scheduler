import { getTable } from "./database";

export type Exercise = {
    exercise_id: string;
    exercise_name: string;
    instructions?: string;
    tips?: string;
};

// Get exercises
export async function getExercises(): Promise<Exercise[]> {
    const table = await getTable("exercises");
    const request = await table.select();
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve exercises");
    }
    return request.data;
}

// Create a new exercise
export async function createExercise(exercise_name: string, instructions?: string, tips?: string): Promise<Exercise> {
    const table = await getTable("exercises");
    const newExercise = {
        exercise_name,
        instructions,
        tips,
    };

    const request = await table.insert(newExercise);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to create exercise");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to create exercise');
    }
    return request.data[0];
}

// Update an existing exercise
export async function updateExercise(exercise_id: string, exercise_name: string, instructions?: string, tips?: string): Promise<Exercise> {
    const table = await getTable("exercises");
    const updatedExercise = {
        exercise_name,
        instructions,
        tips,
    };
    const request = await table.update(updatedExercise).eq("exercise_id", exercise_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to update exercise");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to update exercise');
    }
    return request.data[0];
}

// Delete an exercise
export async function deleteExercise(exercise_id: string): Promise<void> {
    const table = await getTable("exercises");
    const request = await table.delete().eq("exercise_id", exercise_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete exercise");
    }
}