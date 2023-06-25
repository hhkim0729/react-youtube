import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

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
    <form onSubmit={handleSubmit} className="flex basis-6/12">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="basis-10/12 border border-gray-300 border-r-0 rounded-l-3xl p-1 pl-5 text-lg text-gray-800"
        placeholder="검색"
      />
      <button
        type="submit"
        className="w-16 bg-gray-100 border border-gray-300 rounded-r-3xl text-gray-500 hover:bg-gray-200"
      >
        <div className="flex justify-center">
          <MagnifyingGlassIcon className="w-5" />
        </div>
      </button>
    </form>
  );
}
