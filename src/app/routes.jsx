import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';

// SESSION PAGES
const NotFound = Loadable(lazy(() => import('./views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('./views/sessions/JwtLogin')));
const JwtRegister = Loadable(
  lazy(() => import('./views/sessions/JwtRegister')),
);
const ForgotPassword = Loadable(
  lazy(() => import('./views/sessions/ForgotPassword')),
);

const ManageHome = Loadable(lazy(() => import('./views/storeManageMenu/Home')));
const Message = Loadable(lazy(() => import('./views/storeManageMenu/Message')));
const RecruitNotice = Loadable(
  lazy(() => import('./views/storeManageMenu/RecruitNotice')),
);
const WorkerCalendar = Loadable(
  lazy(() => import('./views/storeManageMenu/WorkCalendar')),
);
const WorkerManagement = Loadable(
  lazy(() => import('./views/storeManageMenu/WorkerManagement')),
);

const routes = [
  {
    element:
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>,
    children: [

      {
        path: '/store-manage-menu/management-home',
        element: <ManageHome />,
        auth: authRoles.admin,
      },
      {
        path: '/store-manage-menu/message',
        element: <Message />,
      },
      {
        path: '/store-manage-menu/recruit-notice',
        element: <RecruitNotice />,
      },
      {
        path: '/store-manage-menu/worker-calendar',
        element: <WorkerCalendar />,
      },
      {
        path: '/store-manage-menu/worker-management',
        element: <WorkerManagement />,
      },

      // session pages
      {
        path: '/session/not-found',
        element: <NotFound />,
      },

      {
        path: '/session/forgot-password',
        element: <ForgotPassword />,
      },

    ],
  },

  {
    path: '/session/signin',
    element: <JwtLogin />,
  },
  {
    path: '/',
    element: <Navigate to="/store-manage-menu/management-home" />,
  },
  {
    path: '/session/signup',
    element: <JwtRegister />,
  },
  {
    path: '*',
    element: <NotFound />,
  },

];

export default routes;
