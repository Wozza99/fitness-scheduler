"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditableExercise({
    exercise,
    handleSave,
    handleDelete,
}: {
    exercise: {
        exercise_id: number;
        exercise_name: string;
        instructions: string | undefined;
        tips: string | undefined;
        profile_id: string;
    };
    handleSave: (data: {
        exercise_id: number;
        profile_id: string;
        exercise_name: string;
        instructions: string | undefined;
        tips: string | undefined;
    }) => Promise<void>;
    handleDelete: (exercise_id: number) => Promise<void>;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [exerciseName, setExerciseName] = useState(exercise.exercise_name);
    const [instructions, setInstructions] = useState(exercise.instructions || "");
    const [tips, setTips] = useState(exercise.tips || "");
    const router = useRouter();

    const onSave = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await handleSave({
                exercise_id: exercise.exercise_id,
                profile_id: exercise.profile_id,
                exercise_name: exerciseName,
                instructions,
                tips,
            });
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error("Failed to save changes:", error);
            alert("Error saving changes. Please try again.");
        }
    };

    const onDelete = async () => {
        if (confirm("Are you sure you want to delete this exercise?")) {
            try {
                await handleDelete(exercise.exercise_id);
                router.push("/protected/exercises"); // Redirect after deletion
            } catch (error) {
                console.error("Failed to delete exercise:", error);
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setExerciseName(exercise.exercise_name);
        setInstructions(exercise.instructions || "");
        setTips(exercise.tips || "");
    };

    /**
     * Renders the instructions as an ordered list or plain text.
     * @param {string | null} instructions - The instructions text.
     * @returns {JSX.Element} The rendered instructions.
     */
    const renderInstructions = (instructions: string | null) => {
        if (!instructions || instructions.trim() === "") return <p>No instructions available.</p>;

        const lines = instructions.split("\n").filter((line) => line.trim() !== "");

        // Render as an ordered list if there are multiple lines
        if (lines.length > 1) {
            return (
                <ol>
                    {lines.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ol>
            );
        }

        // Render as plain text if it's a single line
        return <p>{instructions}</p>;
    };

    return (
        <form onSubmit={onSave}>
            {isEditing ? (
                <>
                    <div>
                        <Label>
                            Exercise Name:
                            <Input
                                type="text"
                                value={exerciseName}
                                onChange={(e) => setExerciseName(e.target.value)}
                                required
                            />
                        </Label>
                    </div>
                    <div>
                        <Label>
                            Instructions:
                            <textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </Label>
                    </div>
                    <div>
                        <Label>
                            Tips:
                            <textarea
                                value={tips}
                                onChange={(e) => setTips(e.target.value)}
                                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </Label>
                    </div>
                    <Button type="submit" variant="ghost">
                        Save
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleCancel}>
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <h1>{exerciseName}</h1>
                    <h2>Instructions</h2>
                    {renderInstructions(instructions)}
                    {exercise.tips && exercise.tips.trim() !== "" && (
                        <>
                            <h2>Tips</h2>
                            <p>{exercise.tips}</p>
                        </>
                    )}
                    <Button type="button" variant="ghost" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                    <Button type="button" variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button asChild variant={"outline"}>
                        <Link href={`/protected/exercises`}>Back</Link>
                    </Button>
                </>
            )}
        </form>
    );
}
