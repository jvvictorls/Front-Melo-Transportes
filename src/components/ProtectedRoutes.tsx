import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const all = ['admin', 'supervisor', 'coordinator', 'manager', 'superadmin', 'collaborator'];

export default function ProtectedRoutes(
  { children, allowedTypes = all }: { children: JSX.Element, allowedTypes?: string[] },
) {
  const { accessToken, user } = useContext(AuthContext);
  const location = useLocation();
  if (!accessToken) {
    return <Navigate to="/unauthorized" state={ { from: location } } replace />;
  }
  if (!!user && !allowedTypes.includes(user.type)) return <Navigate to="/unauthorized" replace />;
  return children;
}
