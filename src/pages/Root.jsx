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
      <footer>
        <div className="flex justify-center mb-10">
          <a
            href="https://github.com/hhkim0729"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`${process.env.PUBLIC_URL}/github_logo.svg`}
              className="w-10"
              alt={`hhkim's github`}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
