import { Outlet, Link } from 'react-router-dom';
import SearchInput from 'components/SearchInput';

export default function Root() {
  return (
    <>
      <header>
        <div>
          <Link to="/">Youtube</Link>
        </div>
        <SearchInput />
      </header>
      <Outlet />
    </>
  );
}
