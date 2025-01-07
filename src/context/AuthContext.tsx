import { createContext } from 'react';
import AuthProviderType from '../types/AuthProviderType';

export default createContext<AuthProviderType>({} as AuthProviderType);
