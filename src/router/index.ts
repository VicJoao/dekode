import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Editor from '../pages/Editor/Editor';
import AppLayout from '../components/Layout/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'editor',
        element: <Editor />,
      },
    ],
  },
]);