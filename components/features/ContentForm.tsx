'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { uploadFile } from '@/firebase/storage';
import { Content } from '@/firebase/firestore';
import { Image as ImageIcon, Video, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ContentFormProps {
    initialData?: Content;
    onSubmit: (data: Omit<Content, 'id'>) => Promise<void>;
    title: string;
}

export function ContentForm({ initialData, onSubmit, title }: ContentFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Omit<Content, 'id'>>({
        title: '',
        description: '',
        category: '',
        imageUrl: '',
        videoUrl: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                category: initialData.category,
                imageUrl: initialData.imageUrl || '',
                videoUrl: initialData.videoUrl || '',
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl;
            let videoUrl = formData.videoUrl;

            if (imageFile) {
                imageUrl = await uploadFile(imageFile, 'images');
            }

            if (videoFile) {
                videoUrl = await uploadFile(videoFile, 'videos');
            }

            await onSubmit({
                ...formData,
                imageUrl,
                videoUrl,
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

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Título"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Descrição</label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bordo-500 focus:border-transparent"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <Input
                            label="Categoria (ex: Crânio, Músculos)"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />

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
                                {formData.imageUrl && !imageFile && (
                                    <p className="text-xs text-gray-500">Imagem atual: {formData.imageUrl}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    Vídeo (Opcional)
                                </label>
                                <Input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-bordo-50 file:text-bordo-700 hover:file:bg-bordo-100"
                                />
                                {formData.videoUrl && !videoFile && (
                                    <p className="text-xs text-gray-500">Vídeo atual: {formData.videoUrl}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" isLoading={loading} className="w-full md:w-auto">
                                <Save className="mr-2 h-4 w-4" />
                                Salvar Conteúdo
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
