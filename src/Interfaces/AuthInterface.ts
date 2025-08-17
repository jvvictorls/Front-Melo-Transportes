import JWTpayloadInterface from './JWTPayloadInterface';

interface AuthInterface {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user?: JWTpayloadInterface | null;
}

export default AuthInterface;
