export interface JwtPayload {
  sub: string;
  email: string;
}

export type RefreshTokenPayload = {
  sub: string;
};
