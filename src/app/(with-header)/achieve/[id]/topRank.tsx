"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import TopRankSkeleton from "@/components/skeleton/topRankSkelton";
import PodiumSpot from "@/components/confetti/Confetti";
import { TeamMember } from "@/types/leaderboard/leaderboard";
import Image from "next/image";

async function fetchLeaderBoard(id: string): Promise<TeamMember[]> {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch leaderboard");

  const result = await response.json();
  return result.result;
}

function TobRank() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ["leaderboard", id],
    queryFn: () => fetchLeaderBoard(id as string),
    enabled: !!id,
  });

  if (isLoading) return <TopRankSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const sortedUsers = data ? [...data].sort((a, b) => b.score - a.score) : [];

  const topThree: (TeamMember | null)[] = [
    sortedUsers[0] || null,
    sortedUsers[1] || null,
    sortedUsers[2] || null,
  ];

  return (
    <div className="w-full flex flex-col mb-8 md:mb-0">
      <div className="flex items-center mb-4">
        <Image
          src={"/trophy.png"}
          alt="트로피"
          width={40}
          height={40}
          className="mr-[10px]"
        />
        <h3 className="md:text-[1.3rem] text-[1.1rem] font-semibold  text-[rgba(0,0,0,0.7)]">
          오늘까지 점수 랭크에요
        </h3>
      </div>
      <div className="flex justify-center items-end gap-4 relative">
        <PodiumSpot
          rank={3}
          name={topThree[1]?.nickname || "-"}
          points={topThree[1]?.score || 0}
          image={topThree[1]?.profileImgUrl || ""}
        />

        <PodiumSpot
          rank={1}
          name={topThree[0]?.nickname || "-"}
          points={topThree[0]?.score || 0}
          image={topThree[0]?.profileImgUrl || ""}
        />

        <PodiumSpot
          rank={2}
          name={topThree[2]?.nickname || "-"}
          points={topThree[2]?.score || 0}
          image={topThree[2]?.profileImgUrl || ""}
        />
      </div>
    </div>
  );
}

export default TobRank;
