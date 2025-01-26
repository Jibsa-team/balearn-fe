"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const TimeLottie = () => {
  const [loadingAnimation, setLoadingAnimation] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/time.json");
        const data = await response.json();
        setLoadingAnimation(data);
      } catch (error) {
        console.error("애니메이션 로딩 오류:", error);
      }
    };

    loadAnimation();
  }, []);

  if (!loadingAnimation) {
    return <div>Loading...</div>;
  }

  return (
    <Lottie
      loop
      animationData={loadingAnimation}
      play
      style={{ width: 200, height: 200 }}
    />
  );
};

export default TimeLottie;
