interface AuthInterface {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

export default AuthInterface;
