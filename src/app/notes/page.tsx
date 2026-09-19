import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '../../services/noteService';
import NotesClient from './Notes.client';

export const metadata = {
  title: 'Notes | NoteHub',
  description: 'View and manage your notes',
};

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Виконуємо prefetch першої сторінки нотаток на сервері
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, 12, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}