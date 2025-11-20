import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-bordo-50 to-white py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="flex flex-col space-y-6">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            GuiaCP <br />
                            <span className="text-bordo-800">Anatomia de Cabeça e Pescoço</span>
                        </h1>
                        <p className="text-lg text-gray-600 md:text-xl max-w-lg">
                            Seu portal educativo completo para o estudo aprofundado da anatomia humana.
                            Explore modelos, artigos e vídeos com rigor científico.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/#conteudo">
                                <Button size="lg" className="w-full sm:w-auto gap-2">
                                    Explorar Conteúdo
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/#sobre">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    Saiba Mais
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-200">
                        {/* Placeholder for Hero Image - In a real app, use next/image */}
                        <div className="absolute inset-0 flex items-center justify-center bg-bordo-100 text-bordo-800/50 font-bold text-2xl">
                            Imagem Anatômica 3D
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
