import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation';

let _client: SupabaseClient | null = null

export async function getClient() {
    if (_client != null) {
        return _client;
    }
    _client = await createClient();
    return _client;
}
export async function getTable(tableName: string) {
    const client = await getClient()
    return client.from(tableName)
}

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