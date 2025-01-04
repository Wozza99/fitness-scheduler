"use client";

import { useState } from "react";
import { Exercise } from "@/utils/data/exercises";
import { WorkoutExercise } from "@/utils/data/workout-exercises";
import Table from "@/components/ui/table";

interface AddExerciseFormProps {
    workoutID: number;
    exercises: Exercise[];
    onAddExercise: (newExercise: Partial<WorkoutExercise>) => void;
}

/**
 * AddExerciseForm component - Form to add a new exercise to a workout.
 * @param {AddExerciseFormProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const AddExerciseForm: React.FC<AddExerciseFormProps> = ({ workoutID, exercises, onAddExercise }) => {
    const [newExercise, setNewExercise] = useState<Partial<WorkoutExercise>>({});
    const [isAdding, setIsAdding] = useState(false);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewExercise((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        onAddExercise(newExercise);
        setIsAdding(false);
        setNewExercise({});
    };

    const handleCancelClick = () => {
        setIsAdding(false);
        setNewExercise({});
    };

    return (
        <tr>
            {isAdding ? (
                <>
                    <td>
                        <select name="exercise_id" onChange={handleInputChange}>
                            <option value="">Select Exercise</option>
                            {exercises.map((exercise) => (
                                <option key={exercise.exercise_id} value={exercise.exercise_id}>
                                    {exercise.exercise_name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <input type="number" name="sets" placeholder="Sets" onChange={handleInputChange} />
                    </td>
                    <td>
                        <input type="number" name="reps" placeholder="Reps" onChange={handleInputChange} />
                    </td>
                    <td>
                        <input type="number" name="duration_seconds" placeholder="Duration (Seconds)" onChange={handleInputChange} />
                    </td>
                    <td>
                        <input type="text" name="notes" placeholder="Notes" onChange={handleInputChange} />
                    </td>
                    <td>
                        <button onClick={handleSaveClick}>Save</button>
                    </td>
                    <td>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </td>
                </>
            ) : (
                <td colSpan={7}>
                    <button onClick={handleAddClick}>Add Exercise</button>
                </td>
            )}
        </tr>
    );
};

interface DeleteExerciseButtonProps {
    workoutID: number;
    exerciseID: number;
    onDelete: (workoutID: number, exerciseID: number) => void;
}

/**
 * DeleteExerciseButton component - Button to delete an exercise from a workout.
 * @param {DeleteExerciseButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const DeleteExerciseButton: React.FC<DeleteExerciseButtonProps> = ({ workoutID, exerciseID, onDelete }) => {
    const handleDeleteClick = () => {
        onDelete(workoutID, exerciseID);
    };

    return <button onClick={handleDeleteClick}>Delete</button>;
};

interface UpdateExerciseFormProps {
    workoutID: number;
    exercise: WorkoutExercise & { exercise_name: string };
    onUpdate: (workoutID: number, exerciseID: number, updates: Partial<WorkoutExercise>) => void;
    onCancel: () => void;
}

/**
 * UpdateExerciseForm component - Form to update an existing exercise in a workout.
 * @param {UpdateExerciseFormProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const UpdateExerciseForm: React.FC<UpdateExerciseFormProps> = ({ workoutID, exercise, onUpdate, onCancel }) => {
    const [updatedExercise, setUpdatedExercise] = useState<Partial<WorkoutExercise>>({
        sets: exercise.sets,
        reps: exercise.reps,
        duration_seconds: exercise.duration_seconds,
        notes: exercise.notes,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedExercise((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        onUpdate(workoutID, exercise.exercise_id, updatedExercise);
    };

    return (
        <>
            <td>{exercise.exercise_name}</td>
            <td>
                <input type="number" name="sets" value={updatedExercise.sets || ''} onChange={handleInputChange} />
            </td>
            <td>
                <input type="number" name="reps" value={updatedExercise.reps || ''} onChange={handleInputChange} />
            </td>
            <td>
                <input type="number" name="duration_seconds" value={updatedExercise.duration_seconds || ''} onChange={handleInputChange} />
            </td>
            <td>
                <input type="text" name="notes" value={updatedExercise.notes || ''} onChange={handleInputChange} />
            </td>
            <td>
                <button onClick={handleSaveClick}>Save</button>
            </td>
            <td>
                <button onClick={onCancel}>Cancel</button>
            </td>
        </>
    );
};

interface WorkoutExerciseTableProps {
    workoutID: number;
    exercises: Exercise[];
    workoutExercises: (WorkoutExercise & { exercise_name: string })[];
    onAddExercise: (newExercise: Partial<WorkoutExercise>) => void;
    onDeleteExercise: (workoutID: number, exerciseID: number) => void;
    onUpdateExercise: (workoutID: number, exerciseID: number, updates: Partial<WorkoutExercise>) => void;
}

/**
 * WorkoutExerciseTable component - Table to display and manage exercises in a workout.
 * @param {WorkoutExerciseTableProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const WorkoutExerciseTable: React.FC<WorkoutExerciseTableProps> = ({
    workoutID,
    exercises,
    workoutExercises,
    onAddExercise,
    onDeleteExercise,
    onUpdateExercise,
}) => {
    const [editingExerciseID, setEditingExerciseID] = useState<number | null>(null);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Duration (Seconds)</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {workoutExercises.map((exercise) => (
                    <tr key={exercise.exercise_id}>
                        {editingExerciseID === exercise.exercise_id ? (
                            <UpdateExerciseForm
                                workoutID={workoutID}
                                exercise={exercise}
                                onUpdate={onUpdateExercise}
                                onCancel={() => setEditingExerciseID(null)}
                            />
                        ) : (
                            <>
                                <td>{exercise.exercise_name}</td>
                                <td>{exercise.sets}</td>
                                <td>{exercise.reps}</td>
                                <td>{exercise.duration_seconds}</td>
                                <td>{exercise.notes}</td>
                                <td>
                                    <button onClick={() => setEditingExerciseID(exercise.exercise_id)}>Edit</button>
                                    <DeleteExerciseButton
                                        workoutID={workoutID}
                                        exerciseID={exercise.exercise_id}
                                        onDelete={onDeleteExercise}
                                    />
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                <AddExerciseForm workoutID={workoutID} exercises={exercises} onAddExercise={onAddExercise} />
            </tbody>
        </table>
    );
};