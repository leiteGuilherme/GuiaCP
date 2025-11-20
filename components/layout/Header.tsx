import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-bordo-800">GuiaCP</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                    <Link href="/#sobre" className="hover:text-bordo-800 transition-colors">
                        Sobre
                    </Link>
                    <Link href="/#conteudo" className="hover:text-bordo-800 transition-colors">
                        Conteúdo
                    </Link>
                    <Link href="/#contato" className="hover:text-bordo-800 transition-colors">
                        Contato
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            Área do Professor
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
