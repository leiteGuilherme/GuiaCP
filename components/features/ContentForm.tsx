'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { uploadImage } from '@/lib/supabase/storage';
import { Content, ContentBlock, Folder, Category, getFolders, getCategories, createFolder } from '@/lib/supabase/database';
import { Image as ImageIcon, Video, Save, ArrowLeft, Plus, Trash2, GripVertical, Type, Layout, AlignLeft, AlignRight, Maximize, Minimize, X } from 'lucide-react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

interface ContentFormProps {
    initialData?: Content;
    onSubmit: (data: Omit<Content, 'id'>) => Promise<void>;
    title: string;
}

export function ContentForm({ initialData, onSubmit, title }: ContentFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const [formData, setFormData] = useState<Omit<Content, 'id' | 'created_at' | 'updated_at'>>({
        title: '',
        description: '',
        category: '',
        folder_id: null,
        image_url: '',
        video_url: '',
        blocks: [],
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [blockFiles, setBlockFiles] = useState<{ [key: string]: File }>({});

    useEffect(() => {
        const loadCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const loadFolders = async () => {
            if (formData.category) {
                const data = await getFolders(formData.category);
                setFolders(data);
            } else {
                setFolders([]);
            }
        };
        loadFolders();
    }, [formData.category]);

    const handleCreateFolder = async () => {
        if (!newFolderName.trim() || !formData.category) return;

        try {
            const newFolder = await createFolder({
                name: newFolderName,
                category: formData.category,
            });

            // Refresh folders and select the new one
            const updatedFolders = await getFolders(formData.category);
            setFolders(updatedFolders);
            setFormData(prev => ({ ...prev, folder_id: newFolder.id }));

            setIsCreatingFolder(false);
            setNewFolderName('');
        } catch (error) {
            console.error('Error creating folder:', error);
            alert('Erro ao criar pasta.');
        }
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                category: initialData.category,
                folder_id: initialData.folder_id || null,
                image_url: initialData.image_url || '',
                video_url: initialData.video_url || '',
                blocks: initialData.blocks || [],
            });
        }
    }, [initialData]);

    const addBlock = (type: 'text' | 'image' | 'video' | 'image-text') => {
        const newBlock: ContentBlock = {
            id: uuidv4(),
            type,
            content: '',
        };
        setFormData(prev => ({ ...prev, blocks: [...(prev.blocks || []), newBlock] }));
    };

    const removeBlock = (id: string) => {
        setFormData(prev => ({ ...prev, blocks: (prev.blocks || []).filter(b => b.id !== id) }));
        const newBlockFiles = { ...blockFiles };
        delete newBlockFiles[id];
        setBlockFiles(newBlockFiles);
    };

    const updateBlock = (id: string, content: string) => {
        setFormData(prev => ({
            ...prev,
            blocks: (prev.blocks || []).map(b => b.id === id ? { ...b, content } : b)
        }));
    };

    const updateBlockSettings = (id: string, settings: any) => {
        setFormData(prev => ({
            ...prev,
            blocks: (prev.blocks || []).map(b => b.id === id ? { ...b, settings: { ...b.settings, ...settings } } : b)
        }));
    };

    const handleBlockFileChange = (id: string, file: File) => {
        setBlockFiles(prev => ({ ...prev, [id]: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let image_url = formData.image_url;
            const blocks = [...(formData.blocks || [])];

            // Upload main cover image
            if (imageFile) {
                image_url = await uploadImage(imageFile);
            }

            // Upload block images
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.type === 'image' && blockFiles[block.id]) {
                    const url = await uploadImage(blockFiles[block.id]);
                    blocks[i] = { ...block, content: url };
                } else if (block.type === 'image-text' && blockFiles[block.id]) {
                    const url = await uploadImage(blockFiles[block.id]);
                    blocks[i] = { ...block, settings: { ...block.settings, imageUrl: url } };
                }
            }

            await onSubmit({
                ...formData,
                image_url,
                blocks,
            });

            router.push('/admin/conteudo');
        } catch (error) {
            console.error('Error saving content:', error);
            alert('Erro ao salvar conteúdo. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/conteudo">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardContent className="pt-6 space-y-6">
                        <Input
                            label="Título *"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Descrição *</label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bordo-500 focus:border-transparent"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                placeholder="Descrição detalhada do conteúdo"
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Categoria *</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bordo-500 focus:border-transparent"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value, folder_id: null })}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Pasta (Opcional)</label>
                                <div className="flex gap-2">
                                    <select
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bordo-500 focus:border-transparent"
                                        value={formData.folder_id || ''}
                                        onChange={(e) => setFormData({ ...formData, folder_id: e.target.value || null })}
                                        disabled={!formData.category}
                                    >
                                        <option value="">Nenhuma pasta</option>
                                        {folders.map((folder) => (
                                            <option key={folder.id} value={folder.id}>
                                                {folder.name}
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={!formData.category}
                                        onClick={() => setIsCreatingFolder(true)}
                                        title="Criar nova pasta"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {isCreatingFolder && (
                                    <div className="flex gap-2 mt-2 items-center">
                                        <Input
                                            value={newFolderName}
                                            onChange={(e) => setNewFolderName(e.target.value)}
                                            placeholder="Nome da nova pasta"
                                            className="h-8 text-sm"
                                            autoFocus
                                        />
                                        <Button
                                            type="button"
                                            variant="primary"
                                            size="sm"
                                            onClick={handleCreateFolder}
                                            disabled={!newFolderName.trim()}
                                        >
                                            OK
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setIsCreatingFolder(false);
                                                setNewFolderName('');
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4" />
                                    Imagem de Capa
                                </label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-bordo-50 file:text-bordo-700 hover:file:bg-bordo-100"
                                />
                                {formData.image_url && !imageFile && (
                                    <div className="mt-2">
                                        <img src={formData.image_url} alt="Capa atual" className="h-20 w-auto rounded-md object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    URL do Vídeo (Opcional)
                                </label>
                                <Input
                                    type="url"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={formData.video_url}
                                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Blocos de Conteúdo</h2>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm" onClick={() => addBlock('text')}>
                                <Type className="mr-2 h-4 w-4" />
                                Texto
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={() => addBlock('image')}>
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Imagem
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={() => addBlock('video')}>
                                <Video className="mr-2 h-4 w-4" />
                                Vídeo
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={() => addBlock('image-text')}>
                                <Layout className="mr-2 h-4 w-4" />
                                Texto + Imagem
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {(formData.blocks || []).length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
                                Adicione blocos de texto, imagem ou vídeo para criar o conteúdo
                            </div>
                        )}

                        {formData.blocks?.map((block, index) => (
                            <Card key={block.id} className="relative group">
                                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <Button type="button" variant="ghost" size="sm" className="text-gray-400 cursor-move">
                                        <GripVertical className="h-4 w-4" />
                                    </Button>
                                    <Button type="button" variant="danger" size="sm" onClick={() => removeBlock(block.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardContent className="pt-6">
                                    {block.type === 'text' && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Texto</label>
                                            <textarea
                                                className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bordo-500"
                                                value={block.content}
                                                onChange={(e) => updateBlock(block.id, e.target.value)}
                                                placeholder="Digite o conteúdo do texto..."
                                            />
                                        </div>
                                    )}

                                    {block.type === 'image' && (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Imagem</label>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleBlockFileChange(block.id, file);
                                                    }}
                                                />
                                                {(block.content || blockFiles[block.id]) && (
                                                    <div className="mt-2">
                                                        {blockFiles[block.id] ? (
                                                            <p className="text-sm text-green-600">Arquivo selecionado: {blockFiles[block.id].name}</p>
                                                        ) : (
                                                            <img src={block.content} alt="Bloco" className="h-32 w-auto rounded-md object-cover" />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Tamanho da Imagem</label>
                                                <div className="flex gap-2">
                                                    {['25%', '50%', '75%', '100%'].map((size) => (
                                                        <Button
                                                            key={size}
                                                            type="button"
                                                            variant={block.settings?.width === size ? 'primary' : 'outline'}
                                                            size="sm"
                                                            onClick={() => updateBlockSettings(block.id, { width: size })}
                                                        >
                                                            {size}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {block.type === 'image-text' && (
                                        <div className="space-y-6">
                                            <div className="flex gap-4 border-b pb-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Layout</label>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="button"
                                                            variant={block.settings?.layout === 'stacked' ? 'primary' : 'outline'}
                                                            size="sm"
                                                            onClick={() => updateBlockSettings(block.id, { layout: 'stacked' })}
                                                            title="Empilhado"
                                                        >
                                                            <Maximize className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant={block.settings?.layout === 'side-by-side' ? 'primary' : 'outline'}
                                                            size="sm"
                                                            onClick={() => updateBlockSettings(block.id, { layout: 'side-by-side' })}
                                                            title="Lado a Lado"
                                                        >
                                                            <Layout className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                {block.settings?.layout === 'side-by-side' && (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">Posição da Imagem</label>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                type="button"
                                                                variant={block.settings?.imagePosition === 'left' ? 'primary' : 'outline'}
                                                                size="sm"
                                                                onClick={() => updateBlockSettings(block.id, { imagePosition: 'left' })}
                                                                title="Esquerda"
                                                            >
                                                                <AlignLeft className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant={block.settings?.imagePosition === 'right' ? 'primary' : 'outline'}
                                                                size="sm"
                                                                onClick={() => updateBlockSettings(block.id, { imagePosition: 'right' })}
                                                                title="Direita"
                                                            >
                                                                <AlignRight className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Tamanho da Imagem</label>
                                                    <div className="flex gap-2">
                                                        {['25%', '50%', '75%', '100%'].map((size) => (
                                                            <Button
                                                                key={size}
                                                                type="button"
                                                                variant={block.settings?.width === size ? 'primary' : 'outline'}
                                                                size="sm"
                                                                onClick={() => updateBlockSettings(block.id, { width: size })}
                                                            >
                                                                {size}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Texto</label>
                                                    <textarea
                                                        className="flex min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bordo-500"
                                                        value={block.content}
                                                        onChange={(e) => updateBlock(block.id, e.target.value)}
                                                        placeholder="Digite o conteúdo do texto..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Imagem</label>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleBlockFileChange(block.id, file);
                                                        }}
                                                    />
                                                    {(block.settings?.imageUrl || blockFiles[block.id]) && (
                                                        <div className="mt-2">
                                                            {blockFiles[block.id] ? (
                                                                <p className="text-sm text-green-600">Arquivo selecionado: {blockFiles[block.id].name}</p>
                                                            ) : (
                                                                <img src={block.settings?.imageUrl} alt="Bloco" className="h-32 w-auto rounded-md object-cover" />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {block.type === 'video' && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">URL do Vídeo</label>
                                            <Input
                                                type="url"
                                                placeholder="https://www.youtube.com/..."
                                                value={block.content}
                                                onChange={(e) => updateBlock(block.id, e.target.value)}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="sticky bottom-6 flex justify-end pt-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-lg">
                    <Button type="submit" isLoading={loading} size="lg" className="w-full md:w-auto shadow-xl">
                        <Save className="mr-2 h-5 w-5" />
                        Salvar Conteúdo Completo
                    </Button>
                </div>
            </form>
        </div>
    );
}
