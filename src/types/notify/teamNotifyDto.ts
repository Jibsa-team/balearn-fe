export interface Notice {
  id: number;
  title: string;
  detail: string;
  createdAt: string;
  createdBy: TeamUser;
  modifiedAt: string;
  modifiedBy: TeamUser;
}

export interface TeamUser {
  id: number;
  userId: number;
  teamId: number;
  role: string;
  nickname: string;
  imgUrl: string;
  createdAt: string;
  modifiedAt: string;
}

export interface NotificationDto {
  responseCode: string;
  result: {
    content: Notice[];
    totalPage: number;
    hasNext: boolean;
  };
  timeStamp: string;
}
