import { useEffect, useState } from 'react';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function SearchInput() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSearchText(query ?? '');
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    navigate({
      pathname: '/results',
      search: `?${createSearchParams({ query: searchText })}`,
    });
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex basis-6/12">
      <input
        type="text"
        value={searchText}
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
