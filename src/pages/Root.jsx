import { Outlet, Link } from 'react-router-dom';
import { PlayCircleIcon } from '@heroicons/react/20/solid';
import SearchInput from 'components/SearchInput';

export default function Root() {
  return (
    <div className="container m-auto">
      <header className="flex justify-center items-center gap-3 pt-4">
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
      <section className="p-4">
        <Outlet />
      </section>
    </div>
  );
}
