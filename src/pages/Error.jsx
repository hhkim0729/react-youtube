import { useRouteError, Link } from 'react-router-dom';

export default function Error() {
  let error = useRouteError();
  console.error(error);
  return (
    <div className="container flex flex-col items-center h-screen mt-52">
      <h1 className="text-4xl font-medium mb-8">Error!</h1>
      <h2 className="text-3xl text-gray-500 font-medium mb-4">
        {error.status} {error.statusText}
      </h2>
      <p className="text-xl text-gray-500 mb-8">{error.data}</p>
      <Link
        to="/"
        replace={true}
        className="w-24 bg-rose-400 hover:bg-rose-500 rounded-md text-center text-white text-lg leading-10"
      >
        Go Home
      </Link>
    </div>
  );
}
