import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from 'pages/Root';
import Main from 'pages/Main';
import SearchResult from 'pages/SearchResult';
import Detail from 'pages/Detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'results',
        element: <SearchResult />,
      },
      {
        path: 'watch/:videoId',
        element: <Detail />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
