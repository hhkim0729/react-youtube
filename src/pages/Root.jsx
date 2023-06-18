import { Outlet } from 'react-router-dom';
import SearchInput from 'components/SearchInput';

export default function Root() {
  return (
    <>
      <header>
        <div>로고</div>
        <SearchInput />
      </header>
      <Outlet />
    </>
  );
}
