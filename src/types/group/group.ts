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
