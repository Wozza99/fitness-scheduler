import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

let _client:SupabaseClient|null = null

export async function getClient() {
    if (_client != null) {
        return _client;
    }
    _client = await createClient();
    return _client;
}
export async function getTable(tableName:string) {
    const client = await getClient()
    return client.from(tableName)
}