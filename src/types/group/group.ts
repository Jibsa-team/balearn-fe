export interface GroupDTO {
  responseCode: string;
  result: {
    teamId: number;
  };
  timeStamp: string;
}

export interface GroupListInfo {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  createdAt: string;
  createdBy: number;
  modifiedAt: string;
  modifiedBy: number;
}

export interface GroupListDto {
  path: string;
  responseCode: string;
  message: string;
  result: GroupListInfo[];
  timeStamp: string;
}

export interface GroupJoinDto {
  path: string;
  responseCode: string;
  message: string;
  result: {
    id: number;
    userId: number;
    teamId: number;
    role: "OWNER" | "MEMBER";
    nickname: string;
    imgUrl: string;
    createdAt: string;
    modifiedAt: string;
  };
  timeStamp: string;
}
