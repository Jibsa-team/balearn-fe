"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), {
  ssr: false,
  loading: () => <div className="w-[230px] h-[230px]" />,
});

const GroupLottie = () => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadAnimation = async () => {
      try {
        const cachedData = sessionStorage.getItem("groupEmptyAnimation");

        if (cachedData) {
          setAnimationData(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }

        const response = await fetch("/groupEmpty.json");
        const data = await response.json();

        if (mounted) {
          setAnimationData(data);
          sessionStorage.setItem("groupEmptyAnimation", JSON.stringify(data));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("애니메이션 로딩 오류:", error);
        setIsLoading(false);
      }
    };

    loadAnimation();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading || !animationData) {
    return <div className="w-[230px] h-[230px] animate-pulse rounded-lg b" />;
  }

  return (
    <div className="w-[230px] h-[230px]">
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
          progressiveLoad: true,
        }}
      />
    </div>
  );
};

export default GroupLottie;
