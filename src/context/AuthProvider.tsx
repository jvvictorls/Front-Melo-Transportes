import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
  }, [accessToken]);

  return (
    <AuthContext.Provider value={ { accessToken, setAccessToken } }>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
