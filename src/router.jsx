// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home/Home';
import Auth from './pages/customer/Auth';
import VendorRegistration from './pages/vendor/Registration';
import EventPlanning from './pages/customer/EventPlanning';
import NotFound from './pages/shared/NotFound';
import ErrorPage from './components/ErrorPage';
import CorporateLogin from "./pages/corporate/Login";
import CorporateSignUp from "./pages/corporate/SignUp";

import OtpPage from './pages/customer/OtpVerification';
import VendorList from './pages/customer/VendorList';
import VendorDetails from './pages/customer/VendorDetails';
import Chat from './pages/customer/Chat';

import AdminDashboard from './pages/admin/Dashboard';
import VendorOnboarding from './pages/vendor/Onboarding';
import VendorDashboard from './pages/vendor/Dashboard';
import VendorChatList from './pages/vendor/ChatList';
import VendorChat from './pages/vendor/Chat';

import CorporateBooking from './pages/corporate/Booking';
import UserDashboard from './pages/customer/Dashboard';
import OtpVerification from "./pages/customer/OtpVerification";

import RefundPolicy from './pages/info/RefundPolicy';
import CancellationPolicy from './pages/info/CancellationPolicy';
import ContactUs from './pages/info/ContactUs.jsx';

import ChooseBooking from "./pages/customer/ChooseBooking";
import AltBookingFlow from "./pages/customer/AltBookingFlow";

// import CorporateDashboard from './pages/corporate/Dashboard.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  
{ 
    path: '/corporate', 
    element: <CorporateBooking />,
    errorElement: <ErrorPage />
  },
  
  { 
    path: '/corporate/booking', 
    element: <CorporateBooking />,
    errorElement: <ErrorPage />
  },
  
  {
    path: '/AdminDashboard',
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/CorporateDashboard',
    element: <CorporateDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/otp',
    element: <OtpVerification />,
    errorElement: <ErrorPage />
  },
  { 
    path: '*', 
    element: <NotFound />,
    errorElement: <ErrorPage />
  }
  {
    path: '/UserDashboard',
    element: <UserDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/corporate-login',
    element: <CorporateLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/corporate-signup',
    element: <CorporateSignup />,
    errorElement: <ErrorPage />,
  },
      {
        path: '/login',
    element: <CustomerAuth />,
    errorElement: <ErrorPage />
  },
      {
    path: '/signup',
    element: <CustomerAuth />,
    errorElement: <ErrorPage />
  },
  {
    path: '/VendorRegistration',
    element: <VendorRegistration />,
    errorElement: <ErrorPage />,
  },
  { 
    path: '/plan-event/form', 
    element: <EventPlanning />, 
    errorElement: <ErrorPage />
  },
  {
    path: '/chat',
    element: <Chat />,
    errorElement: <ErrorPage />,
  },
  {
    // legacy static route, keep for compatibility
    path: '/VendorDetails',
    element: <VendorDetails />,
    errorElement: <ErrorPage />,
  },
  { 
    path: '/plan-event/form', 
    element: <EventPlanning />, 
    errorElement: <ErrorPage />
  },
  {
    // preferred dynamic route
    path: '/vendor/:id',
    element: <VendorDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/listings',
    element: <VendorList />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/listings/:vendorType',
    element: <VendorList />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
   {
    path: '/vendor',
    errorElement: <ErrorPage />,
    children: [
      { path: 'register', element: <VendorOnboarding /> },
      { path: 'dashboard', element: <VendorDashboard /> },
      { path: 'chats', element: <VendorChatList /> },
      { path: 'chat', element: <VendorChat /> },
    ],
  },
  {
    path: '/plan-event',
    errorElement: <ErrorPage />,
    children: [{ path: 'form', element: <EventPlanning /> }],
  },
  {
    path: '/booking',
    element: <ChooseBooking />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/booking/alt',
    element: <AltBookingFlow />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/otp',
    element: <OtpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contact-us',
    element: <ContactUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/refund-policy',
    element: <RefundPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cancellation-policy',
    element: <CancellationPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/event-planning',
    element: <EventPlanning />,
    errorElement: <ErrorPage />,
  },

]);

export default router;
