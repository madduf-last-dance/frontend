import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import HotelDetailPage from './pages/HotelDetailPage/HotelDetailPage';
import MyHotelsPage from './pages/MyHotelsPage/MyHotelsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/profiles',
    element: <h1>/profiles</h1>
  },
  {
    path: '/profiles/:profileId',
    element: <ProfilePage />
  },
  {
    path: '/hotels/:id',
    element: <HotelDetailPage />
  },
  {
    path: '/my-hotels',
    element: <MyHotelsPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
