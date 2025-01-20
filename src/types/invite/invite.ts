export type InviteCodeDto = {
  path: string;
  responseCode: string;
  message: string;
  result: {
    inviteCode: string;
  };
  timeStamp: string;
};
