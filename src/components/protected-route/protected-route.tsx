import { selectIsAuthenticated } from '@selectors';
import { useSelector } from '@services';
import { Navigate, useLocation } from 'react-router-dom';

import type { ProtectedRouteProps } from './type';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth,
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (onlyUnAuth && isAuthenticated) {
    const from = state?.from?.pathname ?? '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
