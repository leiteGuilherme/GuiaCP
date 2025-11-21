'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileText, Image as ImageIcon, Video } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        contents: 0,
        images: 0,
        videos: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Count contents
                const { count: contentsCount } = await supabase
                    .from('contents')
                    .select('*', { count: 'exact', head: true });

                // Count images (approximate based on contents with image_url)
                const { count: imagesCount } = await supabase
                    .from('contents')
                    .select('*', { count: 'exact', head: true })
                    .not('image_url', 'is', null);

                // Count videos (approximate based on contents with video_url)
                const { count: videosCount } = await supabase
                    .from('contents')
                    .select('*', { count: 'exact', head: true })
                    .not('video_url', 'is', null);

                setStats({
                    contents: contentsCount || 0,
                    images: imagesCount || 0,
                    videos: videosCount || 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Conteúdos</CardTitle>
                        <FileText className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.contents}</div>
                        <p className="text-xs text-gray-500">Artigos publicados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Imagens</CardTitle>
                        <ImageIcon className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.images}</div>
                        <p className="text-xs text-gray-500">Conteúdos com imagem</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vídeos</CardTitle>
                        <Video className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.videos}</div>
                        <p className="text-xs text-gray-500">Conteúdos com vídeo</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
