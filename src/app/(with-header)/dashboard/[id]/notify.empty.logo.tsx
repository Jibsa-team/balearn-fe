"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

function NotifyEmptyLogo() {
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

  return (
    <Lottie
      loop
      animationData={loadingAnimation}
      play
      style={{ width: 50, height: 50 }}
    />
  );
}

export default NotifyEmptyLogo;
