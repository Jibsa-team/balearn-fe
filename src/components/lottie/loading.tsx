"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const LoginLoading = () => {
  const [loadingAnimation, setLoadingAnimation] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/loading.json");
        const data = await response.json();
        setLoadingAnimation(data);
      } catch (error) {
        console.error("애니메이션 로딩 오류:", error);
      }
    };

    loadAnimation();
  }, []);

  if (!loadingAnimation) {
    return <div></div>;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default LoginLoading;
