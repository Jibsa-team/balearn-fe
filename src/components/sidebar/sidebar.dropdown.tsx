"use client";

import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { GroupListDto, GroupListInfo } from "@/types/group/group";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const fetchGroups = async (): Promise<GroupListDto["result"]> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/team/list`
  );
  if (!response.ok) {
    throw new Error("그룹을 불러오는 중에 에러가 발생했습니다.");
  }
  const data: GroupListDto = await response.json();
  return data.result;
};

function SidebarDropdown({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["groupList"],
    queryFn: fetchGroups,
  });
  const router = useRouter();

  const handleTeamClick =
    (group: GroupListInfo) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      router.push(`/dashboard/${group.id}`);
      setIsOpen(false);
    };

  return (
    <div className="relative w-full">
      <div className="absolute top-[100%] left-0 w-full bg-white shadow-lg border border-gray-200 rounded-lg mt-2 z-50">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="p-4 text-center text-red-500">
            Failed to load groups
          </div>
        ) : (
          <ul className="flex flex-col">
            {groups?.map((group) => (
              <li
                key={group.id}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleTeamClick(group)}
              >
                <div className="rounded-full w-[30px] h-[30px] overflow-hidden mr-3 relative">
                  {group.imgUrl ? (
                    <Image
                      src={group.imgUrl}
                      alt={`${group.name} image`}
                      layout="fill"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-full"></div>
                  )}
                </div>
                <span className="text-[1rem]">{group.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SidebarDropdown;
