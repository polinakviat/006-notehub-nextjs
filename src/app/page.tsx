import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Ласкаво просимо до NoteHub!</h1>
      <p style={{ marginTop: '12px', color: '#555' }}>
        Зручний інструмент для керування основними завданнями, робочими та особистими нотатками.
      </p>
      <Link
        href="/notes"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Переглянути нотатки →
      </Link>
    </div>
  );
}