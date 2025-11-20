import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'contents';

export interface Content extends DocumentData {
    id?: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    videoUrl?: string;
    createdAt?: any;
    updatedAt?: any;
}

export const getAllContent = async (): Promise<Content[]> => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Content));
};

export const getContent = async (id: string): Promise<Content | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Content;
    }
    return null;
};

export const addContent = async (content: Omit<Content, 'id'>) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
        ...content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};

export const updateContent = async (id: string, content: Partial<Content>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
        ...content,
        updatedAt: serverTimestamp(),
    });
};

export const deleteContent = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
};
