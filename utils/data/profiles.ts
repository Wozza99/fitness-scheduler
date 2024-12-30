import { getTable } from "./database";

export type Profile = {
    profile_id: string;
    username: string;
    progress: number;
};

// Get profiles
export async function getProfiles(): Promise<Profile[]> {
    const table = await getTable("profiles");
    const request = await table.select();
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve profiles");
    }
    return request.data;
}

// Get a profile by ID
export async function getProfileById(profile_id: string): Promise<Profile> {
    const table = await getTable("profiles");
    const request = await table.select('*').eq("profile_id", profile_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to retrieve profile");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Profile not found');
    }
    return request.data[0];
}

// Update an existing profile
export async function updateProfile(profile_id: string, username: string, progress: number): Promise<Profile> {
    const table = await getTable("profiles");
    const updatedProfile = {
        username,
        progress,
    };
    const request = await table.update(updatedProfile).eq("profile_id", profile_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to update profile");
    }
    if (request?.data?.[0] == null) {
        throw new Error('Unable to update profile');
    }
    return request.data[0];
}

// Delete a profile
export async function deleteProfile(profile_id: string): Promise<void> {
    const table = await getTable("profiles");
    const request = await table.delete().eq("profile_id", profile_id);
    if (request.error != null) {
        console.error(request.error);
        throw new Error("Unable to delete profile");
    }
}