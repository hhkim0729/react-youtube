import { Outlet, Link } from 'react-router-dom';
import { PlayCircleIcon } from '@heroicons/react/20/solid';
import SearchInput from 'components/SearchInput';

export default function Root() {
  return (
    <div className="container m-auto">
      <header className="flex justify-center items-center gap-3 p-4">
        <div className="flex items-center">
          <PlayCircleIcon className="inline-block w-10 text-rose-400" />
          <Link
            to="/"
            className="text-gray-500 text-2xl font-bold font-mono tracking-tighter"
          >
            LightTube
          </Link>
        </div>
        <SearchInput />
      </header>
      <Outlet />
    </div>
  );
}
