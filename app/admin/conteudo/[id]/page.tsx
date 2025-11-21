'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ContentForm } from '@/components/features/ContentForm';
import { getContent, updateContent, Content } from '@/lib/supabase/database';
import { Spinner } from '@/components/ui/Spinner';

export default function EditContentPage() {
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
            <div className="flex h-64 items-center justify-center">
                <Spinner size={32} />
            </div>
        );
    }

    if (!content) {
        return <div>Conteúdo não encontrado.</div>;
    }

    return (
        <ContentForm
            title="Editar Conteúdo"
            initialData={content}
            onSubmit={(data) => updateContent(id, data)}
        />
    );
}
