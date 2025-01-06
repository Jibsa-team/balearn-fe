export interface UploadedFile {
  name: string;
  size: number; // File size in bytes
  owner: string; // File owner (mock data for now)
  lastModified: string; // Last modified date
  preview: string;
  file: File;
}
