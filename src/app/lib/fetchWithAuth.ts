import useAuthStore from "@/store/useAuthStore";

const reissueToken = async () => {
  const setAccessToken = useAuthStore.getState().setAccessToken;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reissue`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Failed to reissue token:", response.status);
      return false;
    }

    const data: { result: { accessToken: string; expirationTime: number } } =
      await response.json();
    setAccessToken(data.result.accessToken, data.result.expirationTime);
    return true;
  } catch (error) {
    console.error("Error reissuing token:", error);
    return false;
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const { expirationTime } = useAuthStore.getState();

  if (expirationTime && Date.now() >= expirationTime) {
    const success = await reissueToken();
    if (!success) {
      throw new Error("Failed to reissue token");
    }
  }

  const updatedAccessToken = useAuthStore.getState().accessToken;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${updatedAccessToken}`,
    credentials: "include",
  };

  return fetch(url, { ...options, headers });
};
