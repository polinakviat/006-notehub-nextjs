'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '../../services/noteService';
import type { Note } from '../../types/note';

import { NoteList } from '../../components/NoteList/NoteList';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { Modal } from '../../components/Modal/Modal';
import { NoteForm } from '../../components/NoteForm/NoteForm';
import { Pagination } from '../../components/Pagination/Pagination';

export default function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const perPage = 12;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  // Використовуємо той самий queryKey, що й під час prefetch на сервері
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery],
    queryFn: () => fetchNotes(page, perPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes || [];
  const totalPages: number = data?.totalPages || 0;

  return (
    <div>
      <div>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Failed to load notes.</p>}

      {!isLoading && !isError && notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      {!isLoading && !isError && notes.length === 0 && (
        <p>No notes found.</p>
      )}

      {!isLoading && !isError && totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
}