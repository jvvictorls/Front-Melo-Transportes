interface AuthInterface {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export default AuthInterface;
