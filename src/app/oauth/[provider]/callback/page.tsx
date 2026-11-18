"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginLoading from "@/components/lottie/loading";
import { LoginRes } from "@/types/login/login";
import useAuthStore from "@/store/useAuthStore";
import useGroupStore from "@/store/useGroupStore";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";

const OAuthCallbackPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
        setError("로그인 세션을 확인할 수 없습니다. 다시 로그인해 주세요.");
        return;
      }

      const data: LoginRes = await response.json();
      setAccessToken(data.result.accessToken, data.result.expirationTime);

      let currentGroupId = groupId;

      if (!currentGroupId || currentGroupId === 0) {
        const groups = await fetchGroupList();
        if (!groups) {
          setError("모임 목록을 불러오지 못했습니다. 다시 시도해 주세요.");
          return;
        }
        if (groups.length > 0) {
          currentGroupId = groups[0].id;
          setGroupId(currentGroupId);
        }
      }

      router.replace(currentGroupId ? `/dashboard/${currentGroupId}` : "/dashboard");
    } catch (error) {
      console.error("Error during token reissue:", error);
      setError("로그인 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("error")) {
      setError("소셜 로그인을 완료하지 못했습니다. 다시 시도해 주세요.");
      return;
    }
    reissueToken();
  }, []);

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p role="alert">{error}</p>
        <Link href="/" className="underline">
          로그인 화면으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoginLoading />
    </div>
  );
};

export default OAuthCallbackPage;
