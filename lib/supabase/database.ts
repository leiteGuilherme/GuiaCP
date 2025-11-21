import { supabase } from './client';

export interface ContentBlock {
    id: string;
    type: 'text' | 'image' | 'video';
    content: string;
}

export interface Content {
    id?: string;
    title: string;
    description: string;
    category: string;
    image_url?: string;
    video_url?: string;
    blocks?: ContentBlock[];
    created_at?: string;
    updated_at?: string;
}

export const getAllContent = async (): Promise<Content[]> => {
    try {
        const { data, error } = await supabase
            .from('contents')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching content from Supabase:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching content:', error);
        return [];
    }
};

export const getContent = async (id: string): Promise<Content | null> => {
    try {
        const { data, error } = await supabase
            .from('contents')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching content:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        return null;
    }
};

export const addContent = async (content: Omit<Content, 'id' | 'created_at' | 'updated_at'>) => {
    try {
        const { data, error } = await supabase
            .from('contents')
            .insert([content])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding content:', error);
        throw error;
    }
};

export const updateContent = async (id: string, content: Partial<Content>) => {
    try {
        const { data, error } = await supabase
            .from('contents')
            .update(content)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating content:', error);
        throw error;
    }
};

export const deleteContent = async (id: string) => {
    try {
        const { error } = await supabase
            .from('contents')
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting content:', error);
        throw error;
    }
};
