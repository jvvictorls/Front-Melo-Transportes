import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { getAccessToken, setAccessToken } from '../services/authService';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessTokenState] = useState(getAccessToken() || '');

  useEffect(() => {
    setAccessToken(accessToken);
    setAccessTokenState(accessToken);
  }, [accessToken]);
  console.log('passou aqui', accessToken);

  if (!accessToken) {
    return null;
  }

  const logout = () => {
    // Implementar aqui a função de logout
    setAccessToken('');
  };

  return (
    <AuthContext.Provider value={ { accessToken, setAccessToken: setAccessTokenState, logout } }>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
