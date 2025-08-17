import { useState, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';
import JWTpayloadInterface from '../Interfaces/JWTPayloadInterface';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const user = useMemo(() => {
    if (!accessToken) return null;
    try {
      return jwtDecode<JWTpayloadInterface>(accessToken);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={ { accessToken, setAccessToken, user } }>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
