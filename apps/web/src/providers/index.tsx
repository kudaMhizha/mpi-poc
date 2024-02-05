import {HelmetProvider} from 'react-helmet-async';
import {Outlet} from 'react-router-dom';
import {helmetContext} from '../constants/helmet';
import {Toaster} from './toast';

export const Providers = () => (
  <HelmetProvider context={helmetContext}>
    <Outlet />
    <Toaster />
  </HelmetProvider>
);
