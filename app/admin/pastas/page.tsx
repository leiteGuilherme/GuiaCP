'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFolders, createFolder, updateFolder, deleteFolder, Folder } from '@/lib/supabase/database';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';

export default function FoldersPage() {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Crânio');
    const [isEditing, setIsEditing] = useState(false);
    const [currentFolder, setCurrentFolder] = useState<Partial<Folder>>({});

    const categories = ["Crânio", "Músculos", "Inervação", "Vascularização", "Cavidade Oral", "ATM"];

    const fetchFolders = async () => {
        setLoading(true);
        try {
            const data = await getFolders(selectedCategory);
            setFolders(data);
        } catch (error) {
            console.error('Error fetching folders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, [selectedCategory]);

    const handleSave = async () => {
        if (!currentFolder.name) return;

        try {
            if (currentFolder.id) {
                await updateFolder(currentFolder.id, { name: currentFolder.name });
            } else {
                await createFolder({
                    name: currentFolder.name,
                    category: selectedCategory,
                });
            }
            setIsEditing(false);
            setCurrentFolder({});
            fetchFolders();
        } catch (error) {
            console.error('Error saving folder:', error);
            alert('Erro ao salvar módulo.');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este módulo? Conteúdos dentro dela não serão excluídos, apenas desvinculados.')) {
            try {
                await deleteFolder(id);
                fetchFolders();
            } catch (error) {
                console.error('Error deleting folder:', error);
                alert('Erro ao excluir módulo.');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/conteudo">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Módulos</h1>
                        <p className="text-gray-600 mt-1">Organize os conteúdos em Módulos por categoria</p>
                    </div>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    className="shadow-lg"
                    onClick={() => {
                        setCurrentFolder({});
                        setIsEditing(true);
                    }}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Nova Módulos
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <span className="text-sm font-bold text-bordo-700">Categoria:</span>
                <select
                    className="flex h-10 w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-bordo-700 focus:outline-none focus:ring-2 focus:ring-bordo-500 focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {isEditing && (
                <Card className="bg-gray-50 border-bordo-200">
                    <CardContent className="p-4 flex items-end gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nome da Módulos</label>
                            <Input
                                value={currentFolder.name || ''}
                                onChange={(e) => setCurrentFolder({ ...currentFolder, name: e.target.value })}
                                placeholder="Ex: Anatomia Básica"
                                autoFocus
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="primary" onClick={handleSave}>
                                <Save className="mr-2 h-4 w-4" />
                                Salvar
                            </Button>
                            <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                <X className="mr-2 h-4 w-4" />
                                Cancelar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Spinner size={32} />
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {folders.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                            Nenhuma Módulos encontrada nesta categoria.
                        </div>
                    ) : (
                        folders.map((folder) => (
                            <Card key={folder.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <span className="font-medium text-lg text-gray-900">{folder.name}</span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setCurrentFolder(folder);
                                                setIsEditing(true);
                                            }}
                                        >
                                            <Edit className="h-4 w-4 text-gray-500" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(folder.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
