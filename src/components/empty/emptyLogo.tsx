"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), {
  ssr: false,
  loading: () => <div className="w-[50px] h-[50px]" />,
});

const EmptyLogo = ({ width, height }: { width: number; height: number }) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadAnimation = async () => {
      try {
        const cachedData = sessionStorage.getItem("emptyLogoAnimation");

        if (cachedData) {
          setAnimationData(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }

        const response = await fetch("/empty.json");
        const data = await response.json();

        if (mounted) {
          setAnimationData(data);
          sessionStorage.setItem("emptyLogoAnimation", JSON.stringify(data));
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
    return <div className="w-[100px] h-[100px] rounded-lg b" />;
  }

  return (
    <div>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width, height }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
          progressiveLoad: true,
        }}
      />
    </div>
  );
};

export default EmptyLogo;
