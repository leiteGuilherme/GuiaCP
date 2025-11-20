'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FileText, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/conteudo', label: 'Conteúdos', icon: FileText },
        { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
            <div className="flex h-16 items-center border-b border-gray-200 px-6">
                <span className="text-xl font-bold text-bordo-800">GuiaCP Admin</span>
            </div>
            <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
                <nav className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-bordo-50 text-bordo-900'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="border-t border-gray-200 pt-4">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                    </Button>
                </div>
            </div>
        </aside>
    );
}
