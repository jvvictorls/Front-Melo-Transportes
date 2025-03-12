import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedSessionStorage = sessionStorage.getItem('accessToken');
  const [accessToken, setAccessToken] = useState(storedSessionStorage);

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={ { accessToken, setAccessToken } }>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
