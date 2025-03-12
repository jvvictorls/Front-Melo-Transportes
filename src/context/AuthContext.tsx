import { createContext } from 'react';
import AuthInterface from '../Interfaces/AuthInterface';

const AuthContext = createContext<AuthInterface>({} as AuthInterface);

export default AuthContext;
