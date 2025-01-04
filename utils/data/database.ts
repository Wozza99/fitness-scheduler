import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation";

let _client: SupabaseClient | null = null

/**
 * Get the Supabase client instance.
 * @returns {Promise<SupabaseClient>} The Supabase client.
 */
export async function getClient() {
    if (_client != null) {
        return _client;
    }
    _client = await createClient();
    return _client;
}

/**
 * Get a reference to a specific table in the database.
 * @param {string} tableName - The name of the table.
 * @returns {Promise<any>} The table reference.
 */
export async function getTable(tableName: string) {
    const client = await getClient()
    return client.from(tableName)
}

/**
 * Verify if the user is authenticated.
 * @param {boolean} [shouldRedirect=true] - Whether to redirect if the user is not authenticated.
 * @returns {Promise<any>} The authenticated user or null if not authenticated.
 */
export async function verifyUser(shouldRedirect: boolean = true) {
    const supabase = await createClient();

    const {
        data: { user }
      } = await supabase.auth.getUser();

    if (!user && shouldRedirect) {
        return redirect("/sign-in");
    }

    return user;
}