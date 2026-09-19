import Link from 'next/link';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDeleteNote?: (id: string) => void;
}

export function NoteList({ notes, onDeleteNote }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.card}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.detailsLink}>
              View details
            </Link>

            {onDeleteNote && (
              <button
                type="button"
                onClick={() => onDeleteNote(note.id)}
                className={css.deleteBtn}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}