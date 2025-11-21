'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getContent, Content } from '@/lib/supabase/database';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContentDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [content, setContent] = useState<Content | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            if (id) {
                const data = await getContent(id);
                setContent(data);
                setLoading(false);
            }
        };
        loadContent();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size={48} />
            </div>
        );
    }

    if (!content) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Conteúdo não encontrado</h1>
                <Link href="/" className="mt-4 inline-block">
                    <Button>Voltar para o Início</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <Link href="/#conteudo" className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-bordo-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Conteúdos
            </Link>

            <article className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <span className="inline-block rounded-full bg-bordo-100 px-3 py-1 text-xs font-semibold text-bordo-800 mb-4">
                        {content.category}
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
                        {content.title}
                    </h1>
                </header>

                {content.image_url && (
                    <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={content.image_url}
                            alt={content.title}
                            className="w-full h-auto object-cover max-h-[600px]"
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none mb-12 text-gray-900 font-medium prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900 prose-li:text-gray-900">
                    <p className="whitespace-pre-wrap">{content.description}</p>
                </div>

                <div className="space-y-12">
                    {content.blocks?.map((block) => (
                        <div key={block.id}>
                            {block.type === 'text' && (
                                <div className="prose prose-lg max-w-none text-gray-900 font-medium prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900 prose-li:text-gray-900">
                                    <p className="whitespace-pre-wrap">{block.content}</p>
                                </div>
                            )}

                            {block.type === 'image' && (
                                <div className="rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={block.content}
                                        alt="Imagem do conteúdo"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {block.type === 'video' && (
                                <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                                    <iframe
                                        src={block.content.replace('watch?v=', 'embed/')}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {content.video_url && !content.blocks?.some(b => b.type === 'video') && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vídeo Explicativo</h2>
                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                            <iframe
                                src={content.video_url.replace('watch?v=', 'embed/')}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
