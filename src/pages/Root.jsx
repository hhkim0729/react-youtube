import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <header>
        <div>로고</div>
        <div>검색바</div>
      </header>
      <Outlet />
    </>
  );
}
