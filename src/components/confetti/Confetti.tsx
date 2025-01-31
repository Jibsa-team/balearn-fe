"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

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
    const timer = setInterval(() => {
      setCount((prev) => (prev < points ? prev + 1 : points));
    }, 50);
    return () => clearInterval(timer);
  }, [points]);

  useEffect(() => {
    if (rank === 1) {
      const fireConfetti = () => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ["#C9D439", "#a864fd", "#29cdff"],
        });

        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ["#ff718d", "#fdff6a"],
        });

        confetti({
          particleCount: 40,
          angle: 90,
          spread: 100,
          origin: { x: 0.5, y: 0.7 },
          colors: ["#78ff44", "#ff718d", "#C9D439"],
          startVelocity: 45,
          gravity: 1,
          drift: 0,
          ticks: 300,
        });
      };

      fireConfetti();
    }
  }, [rank]);

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
    </motion.div>
  );
}

export default PodiumSpot;
