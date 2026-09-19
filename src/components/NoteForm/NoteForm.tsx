'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

export const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Work');

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2>Create New Note</h2>

      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Tag:
        <select value={tag} onChange={(e) => setTag(e.target.value as NoteTag)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Home">Home</option>
          <option value="Important">Important</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
        />
      </label>

      <div className={css.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </form>
  );
};
