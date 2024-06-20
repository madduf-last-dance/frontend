import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import HotelDetailPage from './pages/HotelDetailPage/HotelDetailPage';
import MyHotelsPage from './pages/MyHotelsPage/MyHotelsPage';
import HostProfilePage from './pages/HostProfilePage/HostProfilePage';
import MyReservationsPage from './pages/MyReservationsPage/MyReservationsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/my-hotels',
    element: <MyHotelsPage />
  },
  {
    path: '/hotels/:id',
    element: <HotelDetailPage />
  },
  {
    path: '/profiles/:profileId',
    element: <ProfilePage />
  },
  {
    path: '/host-profiles/:hostId',
    element: <HostProfilePage />
  },
  {
    path: '/reservations/:username',
    element: <MyReservationsPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
