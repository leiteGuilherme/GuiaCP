import { CheckCircle2 } from 'lucide-react';

export function Mission() {
    return (
        <section id="sobre" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="order-2 md:order-1">
                        {/* Placeholder for Mission Image */}
                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center border border-gray-200">
                            <span className="text-gray-400 font-medium">Vídeo Institucional ou Imagem</span>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex flex-col space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Nossa Missão
                        </h2>
                        <p className="text-lg text-gray-600">
                            O GuiaCP nasceu com o propósito de democratizar o acesso ao conhecimento anatômico de alta qualidade.
                            Focamos em clareza, precisão científica e didática visual.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Conteúdo revisado por especialistas',
                                'Material didático interativo',
                                'Foco em anatomia clínica e cirúrgica',
                                'Acesso gratuito para estudantes'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="h-5 w-5 text-bordo-600" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
