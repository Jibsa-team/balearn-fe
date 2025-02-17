import React from "react";
import Image from "next/image";
import { RiMedalFill } from "react-icons/ri";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { TeamMember } from "@/types/leaderboard/leaderboard";
import RankListSkeleton from "@/components/skeleton/rankListSkelton";

async function fetchLeaderBoard(id: string): Promise<TeamMember[]> {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch leaderboard");

  const result = await response.json();
  return result.result;
}

function BoardRight() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ["leaderboard", id],
    queryFn: () => fetchLeaderBoard(id as string),
    enabled: !!id,
  });

  if (isLoading) return <RankListSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const sortedUsers = data ? [...data].sort((a, b) => b.score - a.score) : [];

  return (
    <div className="mt-[30px] md:mt-[0px] w-full md:w-1/2 flex flex-col">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 font-semibold">
          <tr className="sm:text-[1rem] text-[0.9rem] font-semibold text-[rgba(0,0,0,0.7)] ">
            <th className="p-4 text-center w-[20%]">순위</th>
            <th className="p-4 text-left w-[40%]">사용자</th>
            <th className="p-4 text-center w-[40%]">포인트</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers &&
            sortedUsers.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 text-center font-medium flex items-center justify-center">
                  {user.score === 0 ? (
                    <div className="mr-[10px] text-[1.2rem] text-gray-400">
                      -
                    </div>
                  ) : (
                    <>
                      <div className="mr-[10px] text-[1.2rem]">{index + 1}</div>
                      {index < 3 && (
                        <RiMedalFill
                          className={`text-[1.6rem] inline mr-2 ${
                            index === 0
                              ? "text-yellow-400"
                              : index === 1
                              ? "text-gray-400"
                              : "text-yellow-700"
                          }`}
                        />
                      )}
                    </>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-[30px] h-[30px] flex-shrink-0">
                      <Image
                        src={user.profileImgUrl}
                        alt={user.nickname}
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-base">{user.nickname}</span>
                  </div>
                </td>
                <td className="p-4 text-center font-medium">{user.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardRight;
