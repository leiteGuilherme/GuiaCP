'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Content } from '@/lib/supabase/database';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { ArrowLeft, Eye } from 'lucide-react';

export default function FolderPage() {
    const params = useParams();
    const slug = params.slug as string;
    const folderId = params.folderId as string;
    const categoryName = decodeURIComponent(slug);

    const [contents, setContents] = useState<Content[]>([]);
    const [folderName, setFolderName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch folder details
                const { data: folderData, error: folderError } = await supabase
                    .from('folders')
                    .select('name')
                    .eq('id', folderId)
                    .single();

                if (folderError) throw folderError;
                setFolderName(folderData.name);

                // Fetch contents in folder
                const { data: contentsData, error: contentsError } = await supabase
                    .from('contents')
                    .select('*')
                    .eq('folder_id', folderId)
                    .order('created_at', { ascending: false });

                if (contentsError) throw contentsError;
                setContents(contentsData || []);
            } catch (error) {
                console.error('Error fetching folder data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (folderId) {
            fetchData();
        }
    }, [folderId]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size={48} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <Link href={`/categoria/${slug}`} className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-bordo-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para {categoryName}
            </Link>

            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{folderName}</h1>
                <p className="text-gray-600 text-lg">
                    Conteúdos da pasta em {categoryName}
                </p>
            </header>

            {contents.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <p className="text-xl text-gray-500">Nenhum conteúdo encontrado nesta pasta.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contents.map((content) => (
                        <Link key={content.id} href={`/conteudo/${content.id}`} className="group">
                            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-transparent hover:border-bordo-100">
                                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                    {content.image_url ? (
                                        <img
                                            src={content.image_url}
                                            alt={content.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                            <Eye className="h-12 w-12 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white font-medium flex items-center">
                                            Ver detalhes <ArrowLeft className="rotate-180 ml-2 h-4 w-4" />
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-bordo-800 transition-colors">
                                        {content.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-3">
                                        {content.description}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
