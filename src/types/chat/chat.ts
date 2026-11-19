export interface ChatDto {
  id: string;
  teamId: number;
  sender: SenderDto;
  message: string;
  type: string;
  createdAt: string;
}

export interface SenderDto {
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
}
