'use client';

import { useEffect, useState } from 'react';
import { getAllContent, Content } from '@/lib/supabase/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, PlayCircle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export function DynamicContentSection() {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await getAllContent();
                // Get latest 3 items
                setContents(data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    if (loading) {
        return null; // Or a skeleton loader
    }

    if (contents.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Conteúdo Recente
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Confira as últimas adições ao nosso acervo.
                        </p>
                    </div>
                    {/* <Link href="/conteudo">
            <Button variant="outline" className="hidden sm:flex">
              Ver Tudo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link> */}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contents.map((content) => (
                        <Card key={content.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                            <div className="aspect-video relative bg-gray-200 group">
                                {content.image_url ? (
                                    <img
                                        src={content.image_url}
                                        alt={content.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ImageIcon className="h-12 w-12" />
                                    </div>
                                )}
                                {content.video_url && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="h-12 w-12 text-white" />
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <div className="mb-2">
                                    <span className="inline-block rounded-full bg-bordo-50 px-2 py-1 text-xs font-medium text-bordo-800">
                                        {content.category}
                                    </span>
                                </div>
                                <CardTitle className="line-clamp-2 text-xl">{content.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between">
                                <p className="line-clamp-3 text-gray-600 mb-4">
                                    {content.description}
                                </p>
                                <Link href={`/conteudo/${content.id}`} className="w-full">
                                    <Button variant="outline" className="w-full">
                                        Acessar Conteúdo
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
