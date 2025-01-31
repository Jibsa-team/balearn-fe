"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

function PodiumSpot({
  rank,
  name,
  points,
  image,
}: {
  rank: number;
  name: string;
  points: number;
  image: string;
}) {
  const [count, setCount] = useState(0);
  const height =
    rank === 1 ? "md:h-[250px] h-[150px]" : "md:h-[200px] h-[100px]";
  const bgColor = rank === 1 ? "bg-logoColor" : "bg-gray-300";

  useEffect(() => {
    const calculateStepAndInterval = (points: number) => {
      const maxTime = 2000; // 최대 애니메이션 시간 (2초)
      const baseStep = 10;

      if (points <= 100) return { step: baseStep, interval: 50 };

      const step = Math.max(Math.ceil(points / (maxTime / 50)), baseStep);

      return {
        step: step,
        interval: Math.min(50, Math.max(10, 50 - Math.log(points) * 5)),
      };
    };

    const { step, interval } = calculateStepAndInterval(points);

    const timer = setInterval(() => {
      setCount((prev) => {
        const nextCount = prev + step;
        return nextCount >= points ? points : nextCount;
      });
    }, interval);

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
      <div className="relative w-[40px] h-[40px] rounded-full">
        <div className="w-[40px] h-[40px] rounded-full bg-gray-200"></div>
        {image.length > 0 ? (
          <Image
            src={image}
            alt={`${rank}nd`}
            layout="fill"
            className="rounded-full object-cover"
          />
        ) : (
          <div></div>
        )}
      </div>
      <span>{name}</span>
      <span>{count} 점</span>
      <div className={`${bgColor} w-full ${height} rounded-t-md mt-2 relative`}>
        <span className="text-[1.5rem] text-white absolute inset-0 flex items-center justify-center">
          {rank}
        </span>
      </div>
    </motion.div>
  );
}

export default PodiumSpot;
