import { useState } from 'react';
import AuthContext from './AuthContext';
import AuthProviderProps from '../types/AuthProviderProps';

export default function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={ { auth, setAuth } }>
      {children}
    </AuthContext.Provider>
  );
}
