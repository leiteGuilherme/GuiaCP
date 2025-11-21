import Link from 'next/link';
import Image from 'next/image';
import { Skull, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-brand-dark text-white border-t border-white/10">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-5 mb-6 py-1" >
                            <Image src="/logo-white.png" alt="Logo" width={150} height={150} />
                            <p className="text-white/70 text-1xl max-w-sm leading-relaxed">
                                Iniciativa da Liga Acadêmica de Anatomia de Cabeça e Pescoço (UFS, Campus Lagarto). Compromisso com a educação e a ciência.
                            </p>
                        </div>
                    </div>

                    <div>

                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white/90">Contato</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> laacapufslag@gmail.com</li>
                            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lagarto, UFS</li>
                        </ul>
                        <div className="flex gap-3 mt-6">
                            <a href="https://www.instagram.com/laacapufs?igsh=MTBuMHlpY2ljczNhZg==" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors"><Instagram className="w-4 h-4" /></a>

                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
                    <p>&copy; {new Date().getFullYear()} GuiaCP. Todos os direitos reservados.</p>
                    <p className="mt-2 md:mt-0">Feito por Guilherme Leite de Oliveira.</p>
                </div>
            </div>
        </footer>
    );
}
