import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '../../../services/noteService';
import NotesPageClient from '../NotesPage/NotesPage.client';

export const metadata = {
  title: 'Notes | NoteHub',
  description: 'View and manage your notes',
};

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, 12, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient />
    </HydrationBoundary>
  );
}