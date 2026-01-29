import { jwtDecode } from 'jwt-decode';

export default function decodeJwt(token: string) {
  try {
    const decoded = jwtDecode<{ [key: string]: any }>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}
