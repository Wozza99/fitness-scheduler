"use client";

import { useState } from "react";
import Table from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "./ui/input";

interface WorkoutsTableProps {
    workouts: { [key: string]: any }[];
    columns: string[];
    columnNames: { [key: string]: string };
    handleDelete: (workout_id: number) => Promise<{ success: boolean; error?: string }>;
    handleUpdate: (
        workout_id: number,
        workout_name: string,
        description?: string,
        points?: number
    ) => Promise<{ success: boolean; error?: string }>;
}

export default function WorkoutsTable({
    workouts: initialWorkouts,
    columns,
    columnNames,
    handleDelete,
    handleUpdate,
}: WorkoutsTableProps) {
    const [workouts, setWorkouts] = useState(initialWorkouts);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editData, setEditData] = useState<{ [key: string]: any }>({});

    // Start editing a row
    const onEdit = (row: { [key: string]: any }) => {
        setEditingRowId(row.workout_id);
        setEditData({ ...row });
    };

    // Cancel editing
    const onCancel = () => {
        setEditingRowId(null);
        setEditData({});
    };

    // Handle input changes
    const onInputChange = (key: string, value: any) => {
        setEditData({ ...editData, [key]: value });
    };

    // Save changes
    const onSave = async () => {
        const { workout_id, workout_name, description, points } = editData;
        const result = await handleUpdate(workout_id, workout_name, description, points);
        if (result.success) {
            setWorkouts(
                workouts.map((workout) =>
                    workout.workout_id === workout_id ? editData : workout
                )
            );
            setEditingRowId(null);
            setEditData({});
        } else {
            console.error("Failed to update workout:", result.error);
        }
    };

    // Define custom columns for additional actions
    const customColumns = [
        {
            header: "View",
            render: (row: { [key: string]: any }) => {
                return (
                    <>
                        <Button asChild size="sm" variant={"outline"}>
                            <Link href={`/protected/workouts/${row.workout_id}`}>View</Link>
                        </Button>
                    </>
                );
            },
        },
        {
            header: "Edit",
            render: (row: { [key: string]: any }) => {
                if (editingRowId === row.workout_id) {
                    return (
                        <>
                            <Button type="button" size="sm" variant="ghost" onClick={onSave}>
                                Save
                            </Button>
                        </>
                    );
                }
                return (
                    <>
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => onEdit(row)}
                        >
                            Edit
                        </Button>
                    </>
                );
            },
        },
        {
            header: "Delete",
            render: (row: { [key: string]: any }) => {
                if (editingRowId === row.workout_id) {
                    return (
                        <>
                            <Button type="button" size="sm" variant="destructive" onClick={onCancel}>
                                Cancel
                            </Button>
                        </>
                    );
                }
                return (
                    <>
                        <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(row.workout_id)}
                        >
                            Delete
                        </Button>
                    </>
                );
            },
        },
    ];

    // Render table with editable rows
    const data = workouts.map((row) =>
        row.workout_id === editingRowId
            ? {
                ...row,
                workout_name: (
                    <Input
                        type="text"
                        value={editData.workout_name}
                        onChange={(e) => onInputChange("workout_name", e.target.value)}
                    />
                ),
                description: (
                    <Input
                        type="text"
                        value={editData.description || ""}
                        onChange={(e) => onInputChange("description", e.target.value)}
                    />
                ),
                points: (
                    <Input
                        type="number"
                        value={editData.points}
                        onChange={(e) => onInputChange("points", Number(e.target.value))}
                    />
                ),
            }
            : row
    );

    return (
        <Table
            columns={columns}
            data={data}
            columnNames={columnNames}
            customColumns={customColumns}
        />
    );
}
