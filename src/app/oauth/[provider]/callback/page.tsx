"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
        router.push("/dashboard");
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
      }
    } catch (error) {
      console.error("Error during token reissue:", error);
    }
  };

  useEffect(() => {
    console.log(searchParams);

    reissueToken();
  }, [searchParams]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1>로그인 중...</h1>
    </div>
  );
};

export default KakaoCallbackPage;
