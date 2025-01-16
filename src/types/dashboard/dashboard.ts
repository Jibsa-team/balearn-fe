export interface Team {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
}

export interface Notice {
  id: number;
  title: string;
  detail: string;
}

export interface Goal {
  id: number;
  detail: string;
  color: string;
}

export interface TeamUser {
  id: number;
  userId: number;
  role: string;
  nickname: string;
  imgUrl: string;
  createdAt: string;
  modifiedAt: string;
}

export interface Mission {
  id: number;
  detail: string;
}

export interface WeeklySchedule {
  id: number;
  address: string;
  time: string;
  topic: string;
  mission: Mission[];
}

export interface ResponseResult {
  team: Team;
  notice: Notice;
  goal: Goal[];
  teamUser: TeamUser[];
  weekly_schedule: WeeklySchedule[];
}

export interface DashboardType {
  responseCode: string;
  result: ResponseResult;
  timeStamp: string;
}
