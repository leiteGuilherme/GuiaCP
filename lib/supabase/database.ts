import { supabase } from './client';

export interface ContentBlock {
    id: string;
    type: 'text' | 'image' | 'video' | 'image-text';
    content: string;
    settings?: {
        width?: string; // for image blocks
        layout?: 'stacked' | 'side-by-side'; // for image-text blocks
        imagePosition?: 'left' | 'right'; // for image-text blocks
        imageUrl?: string; // for image-text blocks
    };
}

export interface Folder {
    id: string;
    name: string;
    category: string;
    created_at?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    created_at?: string;
}

export interface Content {
    id?: string;
    title: string;
    description: string;
    category: string;
    folder_id?: string | null;
    image_url?: string;
    video_url?: string;
    blocks?: ContentBlock[];
    created_at?: string;
    updated_at?: string;
}

export const getCategories = async (): Promise<Category[]> => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .insert([category])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const deleteCategory = async (id: string) => {
    try {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

export const getFolders = async (category?: string): Promise<Folder[]> => {
    try {
        let query = supabase
            .from('folders')
            .select('*')
            .order('name', { ascending: true });

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching folders:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching folders:', error);
        return [];
    }
};

export const createFolder = async (folder: Omit<Folder, 'id' | 'created_at'>) => {
    try {
        const { data, error } = await supabase
            .from('folders')
            .insert([folder])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }
};

export const updateFolder = async (id: string, folder: Partial<Folder>) => {
    try {
        const { data, error } = await supabase
            .from('folders')
            .update(folder)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating folder:', error);
        throw error;
    }
};

export const deleteFolder = async (id: string) => {
    try {
        const { error } = await supabase
            .from('folders')
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting folder:', error);
        throw error;
    }
};

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
