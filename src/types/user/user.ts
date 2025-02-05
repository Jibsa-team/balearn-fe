export interface User {
  createdAt: string;
  email: string;
  id: number;
  modifiedAt: number;
  name: string;
  phoneNumber: null;
  profileImageUrl: string;
  provider: string;
}

export interface UserDto {
  id: number;
  imgUrl: string;
  nickname: string;
  role: string;
  teamId: number;
  userId: number;
}
