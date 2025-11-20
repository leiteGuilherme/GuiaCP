import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skull, Brain, Activity, Eye, Ear, Smile } from 'lucide-react';

const features = [
    {
        title: 'Crânio e Ossos',
        description: 'Estudo detalhado da osteologia da cabeça e pescoço.',
        icon: Skull,
    },
    {
        title: 'Sistema Nervoso',
        description: 'Nervos cranianos, encéfalo e vias neurais.',
        icon: Brain,
    },
    {
        title: 'Músculos',
        description: 'Origem, inserção e função da musculatura.',
        icon: Activity,
    },
    {
        title: 'Órgãos dos Sentidos',
        description: 'Anatomia do olho, orelha e estruturas sensoriais.',
        icon: Eye,
    },
    {
        title: 'Vasos Sanguíneos',
        description: 'Vascularização arterial e venosa da região.',
        icon: Activity, // Using Activity as placeholder for vessels
    },
    {
        title: 'Articulações',
        description: 'ATM e articulações da coluna cervical.',
        icon: Smile, // Placeholder
    },
];

export function FeatureCards() {
    return (
        <section id="conteudo" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Regiões Anatômicas
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Navegue pelo conteúdo organizado por sistemas e regiões.
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="group hover:shadow-lg transition-shadow border-bordo-100 hover:border-bordo-200">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-bordo-50 text-bordo-800 group-hover:bg-bordo-100 transition-colors">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
