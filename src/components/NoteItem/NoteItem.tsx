'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteItem.module.css';

interface NoteItemProps {
  note: Note;
}

export const NoteItem = ({ note }: NoteItemProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <li className={css.listItem}>
      <div className={css.card}>
        <h3>
          <Link href={`/notes/${note.id}`} className={css.titleLink}>
            {note.title}
          </Link>
        </h3>
        <p className={css.content}>{note.content}</p>
        
        <span className={css.tag}>{note.tag}</span>

        <button
          type="button"
          className={css.deleteButton}
          onClick={() => deleteMutation.mutate(note.id)}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
};