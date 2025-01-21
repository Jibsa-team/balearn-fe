"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

interface EmptyLogoProps {
  width: number;
  height: number;
}

function EmptyLogo({ width, height }: EmptyLogoProps) {
  const [loadingAnimation, setLoadingAnimation] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/empty.json");
        const data = await response.json();
        setLoadingAnimation(data);
      } catch (error) {
        console.error("애니메이션 로딩 오류:", error);
      }
    };

    loadAnimation();
  }, []);

  if (!loadingAnimation) {
    return <div>...</div>;
  }
  console.log(width, height);

  return (
    <Lottie
      loop
      animationData={loadingAnimation}
      play
      className={`w-[${width}] h-[${height}]`}
    />
  );
}

export default EmptyLogo;
