'use client';

import { useAuth } from '@/lib/supabase/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { Spinner } from '@/components/ui/Spinner';
import { Card, CardContent } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size={48} />
            </div>
        );
    }

    if (!user && pathname !== '/admin/login') {
        return null; // Will redirect
    }

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Show warning if Supabase is not configured
    if (!isSupabaseConfigured) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <Card className="max-w-2xl border-yellow-200 bg-yellow-50">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <AlertTriangle className="w-8 h-8 text-yellow-700" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-yellow-900 mb-2">
                                    Supabase não configurado
                                </h2>
                                <p className="text-yellow-800 mb-4">
                                    O Supabase ainda não foi configurado. Por favor, siga os passos abaixo:
                                </p>
                                <ol className="list-decimal list-inside space-y-2 text-yellow-800 mb-4">
                                    <li>Crie um projeto no <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Supabase</a></li>
                                    <li>Copie a URL do projeto e a Anon Key</li>
                                    <li>Adicione as credenciais no arquivo <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code></li>
                                    <li>Execute o SQL schema no Supabase</li>
                                    <li>Reinicie o servidor de desenvolvimento</li>
                                </ol>
                                <p className="text-sm text-yellow-700">
                                    📖 Veja o arquivo <code className="bg-yellow-100 px-1 rounded">SUPABASE_SETUP.md</code> para instruções detalhadas.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
