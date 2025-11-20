'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllContent, deleteContent, Content } from '@/firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function ContentListPage() {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        try {
            const data = await getAllContent();
            setContents(data);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este conteúdo?')) {
            try {
                await deleteContent(id);
                fetchContent(); // Refresh list
            } catch (error) {
                console.error('Error deleting content:', error);
                alert('Erro ao excluir conteúdo.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Spinner size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Conteúdos</h1>
                <Link href="/admin/conteudo/novo">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Conteúdo
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {contents.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <p>Nenhum conteúdo cadastrado.</p>
                        </CardContent>
                    </Card>
                ) : (
                    contents.map((content) => (
                        <Card key={content.id} className="overflow-hidden">
                            <div className="flex items-center p-4 gap-4">
                                {content.imageUrl && (
                                    <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                        <img
                                            src={content.imageUrl}
                                            alt={content.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {content.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">{content.category}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/conteudo/${content.id}`} target="_blank">
                                        <Button variant="ghost" size="sm" title="Visualizar">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/conteudo/${content.id}`}>
                                        <Button variant="outline" size="sm" title="Editar">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => content.id && handleDelete(content.id)}
                                        title="Excluir"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
