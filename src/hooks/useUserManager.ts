import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "@/app/api/userManage";
import { UserDto } from "@/types/user/user";

function useUserMe(id: string) {
  const fetchNotifyData = async (): Promise<UserDto> => {
    const response = await getUserMe(id);
    if (!response.ok) {
      throw new Error("공지를 불러오지 못했습니다.");
    }
    const result = await response.json();
    return result.result;
  };

  return useQuery({
    queryKey: ["teamUserMe", id],
    queryFn: fetchNotifyData,
  });
}

export { useUserMe };
