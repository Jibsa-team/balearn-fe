"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginLoading from "@/components/loading/loading";
import { LoginRes } from "@/types/login/login";
import useAuthStore from "@/store/useAuthStore";

const KakaoCallbackPage = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const reissueToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reissue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      try {
        const data: LoginRes = await response.json();
        console.log(data);
        setAccessToken(data.result.accessToken, data.result.expirationTime);
        router.push("/dashboard");
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
      <LoginLoading />
    </div>
  );
};

export default KakaoCallbackPage;
