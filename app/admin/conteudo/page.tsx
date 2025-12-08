'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllContent, deleteContent, Content } from '@/lib/supabase/database';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function ContentListPage() {
    const [contents, setContents] = useState<Content[]>([]);
    const [filteredContents, setFilteredContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchContent = async () => {
        try {
            const data = await getAllContent();
            setContents(data);
            setFilteredContents(data);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredContents(contents.filter(c => c.category === selectedCategory));
        } else {
            setFilteredContents(contents);
        }
    }, [selectedCategory, contents]);

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

    const categories = ["Crânio", "Músculos", "Inervação", "Vascularização", "Cavidade Oral", "ATM"];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Conteúdos</h1>
                    <p className="text-gray-600 mt-1">Gerencie os conteúdos educacionais</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/pastas">
                        <Button variant="outline" size="lg">
                            Gerenciar Pastas
                        </Button>
                    </Link>
                    <Link href="/admin/conteudo/novo">
                        <Button variant="primary" size="lg" className="shadow-lg">
                            <Plus className="mr-2 h-5 w-5" />
                            Novo Conteúdo
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-sm font-bold text-bordo-700">Filtrar por categoria:</span>
                <select
                    className="flex h-10 w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-bordo-700 focus:outline-none focus:ring-2 focus:ring-bordo-500 focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todas as categorias</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-4">
                {filteredContents.length === 0 ? (
                    <>
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
                                <p>Nenhum conteúdo encontrado.</p>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    filteredContents.map((content) => (
                        <Card key={content.id} className="overflow-hidden">
                            <div className="flex items-center p-4 gap-4">
                                {content.image_url && (
                                    <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                        <img src={content.image_url} alt={content.title} className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{content.title}</h3>
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
                                    <Button variant="danger" size="sm" onClick={() => content.id && handleDelete(content.id)} title="Excluir">
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
