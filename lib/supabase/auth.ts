import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './client';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            router.push('/admin/login');
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    return { user, loading, signOut };
}
