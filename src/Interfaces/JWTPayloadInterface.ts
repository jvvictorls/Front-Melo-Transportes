export default interface JWTpayloadInterface {
  id: number;
  email: string;
  type: string;
  iat: number;
  exp: number;
}
