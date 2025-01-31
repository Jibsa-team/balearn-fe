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
