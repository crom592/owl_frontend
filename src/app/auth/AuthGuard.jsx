import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import AllPages from '../routes';
import { flat } from '../utils/utils';

const userHasPermission = (pathname, role, routes) => {
  const matched = routes.find((r) => r.path === pathname);

  return matched && matched.auth && matched.auth.length ? matched.auth.includes(role) : true;
};

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
  }

  //const routes = flat(AllPages);
  // const hasPermission = userHasPermission(pathname, role, routes);
  return (
    <>
      {isAuthenticated
        ? children
        : <Navigate replace to="/error" state={{ from: pathname }} />
      }
    </>
  );
};

export default AuthGuard;
