'use client';

import { ContentForm } from '@/components/features/ContentForm';
import { addContent } from '@/firebase/firestore';

export default function NewContentPage() {
    return (
        <ContentForm
            title="Novo Conteúdo"
            onSubmit={async (data) => {
                await addContent(data);
            }}
        />
    );
}
