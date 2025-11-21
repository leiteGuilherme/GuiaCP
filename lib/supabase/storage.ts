import { supabase } from './client';

const BUCKET_NAME = 'content-images';

export const uploadImage = async (file: File, path?: string): Promise<string> => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = path || `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const deleteImage = async (url: string): Promise<void> => {
    try {
        // Extract file path from URL
        const urlParts = url.split(`${BUCKET_NAME}/`);
        if (urlParts.length < 2) return;

        const filePath = urlParts[1];

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([filePath]);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

export const getPublicUrl = (path: string): string => {
    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(path);

    return publicUrl;
};
