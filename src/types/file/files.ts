import { TeamUser } from "../dashboard/dashboard";

export interface UploadedFile {
  name: string;
  size: number;
  owner: string;
  lastModified: string;
  preview: string;
  file: File;
}

export interface FileData {
  id: number;
  name: string;
  fileUrl: string;
  size: number;
  type: string;
  createdAt: string;
  createdBy: TeamUser;
  modifiedAt: string;
  modifiedBy: TeamUser;
}

export interface FileDto {
  path: string;
  responseCode: string;
  message: string;
  result: FileData[];
  timeStamp: string;
}
