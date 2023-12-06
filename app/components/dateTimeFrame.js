'use client'

export default function DateTimeFrame ({ dateStr }) {
    const date = new Date(dateStr);

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

  const formattedDate = date.toLocaleDateString(undefined, options);

  return <span>{formattedDate}</span>;
}