export interface EventDto {
  id: number;
  address: string;
  startTime: Date;
  endTime: Date;
  topic: string;
  color: string;
}

export interface Mission {
  id?: number;
  detail: string;
  tempId?: string;
}

export interface CurEventDto {
  id: number;
  address: string;
  startTime: Date;
  endTime: Date;
  topic: string;
  color: string;
  mission: Mission[];
}

// 일정 생성을 위한 타입
export interface CreateEventDto {
  teamId: string | string[];
  address: string;
  startTime: string;
  endTime: string;
  topic: string;
  color: string;
  missions: {
    detail: string;
  }[];
}

export interface UpdateEventDto {
  id?: number;
  teamId?: string | string[];
  address: string;
  startTime: string;
  endTime: string;
  topic: string;
  color: string;
  missions: {
    detail: string;
  }[];
  deleteMissions: number[];
}

// 캘린더에서 사용하는 커스텀 이벤트 타입
export interface CustomEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  color?: string;
}
