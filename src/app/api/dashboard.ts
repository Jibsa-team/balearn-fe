import { fetchWithAuth } from "../lib/fetchWithAuth";

function getDashBoard(id: string) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`);
}

function getWeeklyStudy(teamId: string) {
  return fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/week/team/${teamId}`
  );
}

export { getDashBoard, getWeeklyStudy };
