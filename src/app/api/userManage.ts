import { fetchWithAuth } from "../lib/fetchWithAuth";

function getUserMe(id: string) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}/me`);
}

function getTeamList(id: string) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`);
}

function expelTeamUser(teamId: string, teamUserId: string) {
  return fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/${teamId}/user/${teamUserId}`,
    {
      method: "DELETE",
    }
  );
}

export { getUserMe, getTeamList, expelTeamUser };
