export interface Event {
  teamId: string | string[];
  address: string;
  startTime: string;
  endTime: string;
  topic: string;
  missions: {
    detail: string;
  }[];
}

export interface CustomEvent {
  start: Date;
  end: Date;
  title: string;
  color: string;
}
