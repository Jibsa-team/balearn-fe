"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Confetti from "react-confetti";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";

async function fetchLeaderBoard(id: string) {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch leaderboard");
  return response.json();
}
function TobRank() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboard", id],
    queryFn: () => fetchLeaderBoard(id as string),
    enabled: !!id,
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full flex flex-col mb-8 md:mb-0">
      <h3 className="md:text-[1.4rem] text-[1.2rem] font-semibold mb-4">
        오늘까지 점수 랭크에요
      </h3>
      <div className="flex justify-center items-end gap-4 relative">
        <PodiumSpot rank={3} name="이재인" points={80} />
        <PodiumSpot rank={1} name="황민우" points={100} />
        <PodiumSpot rank={2} name="장경우" points={90} />
      </div>
    </div>
  );
}

function PodiumSpot({
  rank,
  name,
  points,
}: {
  rank: number;
  name: string;
  points: number;
}) {
  const [count, setCount] = useState(0);
  const height =
    rank === 1 ? "md:h-[250px] h-[150px]" : "md:h-[200px] h-[100px]";
  const bgColor = rank === 1 ? "bg-logoColor" : "bg-gray-300";

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let timer = setInterval(() => {
      setCount((prev) => (prev < points ? prev + 1 : points));
    }, 50);
    return () => clearInterval(timer);
  }, [points]);

  return (
    <motion.div
      className="flex flex-col items-center w-full"
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src="/Avatar.png"
        alt={`${rank}nd`}
        width={40}
        height={40}
        className="rounded-full mb-2 cursor-pointer"
      />
      <span>{name}</span>
      <span>{count} pts</span>
      <div className={`${bgColor} w-full ${height} rounded-t-md mt-2 relative`}>
        <span className="text-[1.5rem] text-white absolute inset-0 flex items-center justify-center">
          {rank}
        </span>
      </div>
      {rank === 1 && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Confetti numberOfPieces={200} recycle={false} />
        </div>
      )}
    </motion.div>
  );
}

export default TobRank;
