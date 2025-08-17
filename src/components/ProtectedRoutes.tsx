import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoutes(
  { children, allowedTypes }: { children: JSX.Element, allowedTypes: string[] },
) {
  const { accessToken, user } = useContext(AuthContext);
  const location = useLocation();
  if (!accessToken) {
    return <Navigate to="/unauthorized" state={ { from: location } } replace />;
  }
  if (!!user && !allowedTypes.includes(user.type)) return <Navigate to="/unauthorized" replace />;
  return children;
}
