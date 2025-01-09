"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const KakaoCallbackPage = () => {
  const router = useRouter();

  const reissueToken = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/reissue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      try {
        const data = await response.json();
        console.log(data);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
      }
    } catch (error) {
      console.error("Error during token reissue:", error);
    }
  };

  useEffect(() => {
    reissueToken();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1>로그인 중...</h1>
    </div>
  );
};

export default KakaoCallbackPage;
