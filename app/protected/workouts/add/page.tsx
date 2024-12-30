import { createWorkout } from "@/utils/data/workouts";
import { verifyUser } from '@/utils/data/database';
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function NewWorkoutPage() {
    async function handleSubmit(formData: FormData) {
        'use server';

        const verifiedUser = await verifyUser();
        if (!verifiedUser) {
            throw new Error('Unable to fetch user information');
        }

        const userid = verifiedUser.id;
        const workout_name = formData.get('workout_name') as string;
        const description = formData.get('description') as string;
        const points = Number(formData.get('points') as unknown as string);

        if (!userid || !workout_name) {
            throw new Error('Missing user_id or workout_name');
        }

        try {
            await createWorkout(userid, workout_name, description, points);
        } catch (error) {
            console.error(error);
            throw new Error('Unable to create workout');
        }
        return redirect("/protected/workouts");
    }

    return (
        <div>
            <h1>Create a New Workout</h1>
            <form action={handleSubmit}>
                <label htmlFor="workout_name">Workout Name:</label><br />
                <input id="workout_name" name="workout_name" required /><br />

                <label htmlFor="description">Description:</label><br />
                <textarea id="description" name="description" /><br />

                <label htmlFor="points">Progress Points:</label><br />
                <input type="number" id="points" name="points" /><br />

                <Button type="submit" variant={"outline"}>
                    Create Workout
                </Button>
            </form>
        </div>
    );
}