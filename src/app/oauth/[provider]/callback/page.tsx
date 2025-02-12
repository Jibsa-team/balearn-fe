"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginLoading from "@/components/lottie/loading";
import { LoginRes } from "@/types/login/login";
import useAuthStore from "@/store/useAuthStore";
import useGroupStore from "@/store/useGroupStore";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";

const KakaoCallbackPage = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const groupId = useGroupStore((state) => state.groupId);
  const setGroupId = useGroupStore((state) => state.setGroupId);

  const fetchGroupList = async () => {
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/team/list`
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return null;
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Error fetching group list:", error);
      return null;
    }
  };

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

      const data: LoginRes = await response.json();
      setAccessToken(data.result.accessToken, data.result.expirationTime);

      let currentGroupId = groupId;

      if (!currentGroupId || currentGroupId === 0) {
        const groups = await fetchGroupList();
        if (groups && groups.length > 0) {
          currentGroupId = groups[0].id;
          setGroupId(currentGroupId);
        } else if (groups.length === 0) {
          router.prefetch("/dashboard");
          router.push("/dashboard");
        }
      }

      if (currentGroupId) {
        router.prefetch(`/dashboard/${currentGroupId}`);
        router.push(`/dashboard/${currentGroupId}`);
      } else {
        console.error("No group ID available to navigate.");
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
