export interface TeamMember {
  rank: number;
  nickname: string;
  profileImgUrl: string;
  score: number;
}

export interface LeaderboardDto {
  result: TeamMember[];
}

export interface MissionDto {
  id: number;
  detail: string;
  createdAt: string;
  createdBy: number;
  modifiedAt: string;
  modifiedBy: number;
  clear: false;
}

export interface TodayGoalDto {
  address: string;
  color: string;
  endTime: string;
  id: number;
  mission: MissionDto[];
  startTime: string;
  topic: string;
}
