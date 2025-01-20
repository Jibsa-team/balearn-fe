export interface Notice {
  id: number;
  title: string;
  detail: string;
  createdAt: string;
  createdBy: number;
  modifiedAt: string;
  modifiedBy: number;
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
