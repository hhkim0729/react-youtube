import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate({
      pathname: '/results',
      search: `?${createSearchParams({ query })}`,
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} />
      <button type="submit">검색</button>
    </form>
  );
}
