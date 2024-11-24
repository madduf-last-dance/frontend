import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import HotelDetailPage from './pages/HotelDetailPage/HotelDetailPage';
import MyHotelsPage from './pages/MyHotelsPage/MyHotelsPage';
import HostProfilePage from './pages/HostProfilePage/HostProfilePage';
import MyReservationsPage from './pages/MyReservationsPage/MyReservationsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter([
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
    path: '/reservations/:id',
    element: <MyReservationsPage />
  }
]);
