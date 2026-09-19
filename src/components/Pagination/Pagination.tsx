interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          style={{
            padding: '6px 12px',
            fontWeight: currentPage === p ? 'bold' : 'normal',
            backgroundColor: currentPage === p ? '#0070f3' : '#eee',
            color: currentPage === p ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
};