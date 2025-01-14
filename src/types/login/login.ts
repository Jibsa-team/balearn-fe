export type LoginRes = {
  esponseCode: string;
  result: LoginToken;
  timeStamp: string;
};

export type LoginToken = {
  accessToken: string;
  expirationTime: number;
};
