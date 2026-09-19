import type { Note } from '../types/note';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/docs',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-public.goit.study/api/auth';

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_URL}/notes/${id}`);
  return response.data;
};