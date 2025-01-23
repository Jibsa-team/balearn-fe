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
      if (response.status === 401) {
        useAuthStore.getState().clearAccessToken();
        useAuthStore.getState().clearUser();
        window.location.href = "/login";
      }
      return false;
    }

    const data: { result: { accessToken: string; expirationTime: number } } =
      await response.json();

    if (data.result.accessToken && data.result.expirationTime) {
      setAccessToken(data.result.accessToken, data.result.expirationTime);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error reissuing token:", error);
    return false;
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const { expirationTime, accessToken } = useAuthStore.getState();

  const THRESHOLD_SECONDS = 10;

  if (!accessToken || (expirationTime && expirationTime <= THRESHOLD_SECONDS)) {
    const success = await reissueToken();
    if (!success) {
      throw new Error("Failed to reissue token");
    }
  }

  const updatedAccessToken = useAuthStore.getState().accessToken;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${updatedAccessToken}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    const success = await reissueToken();
    if (success) {
      const retryToken = useAuthStore.getState().accessToken;
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${retryToken}`,
      };
      return fetch(url, {
        ...options,
        headers: retryHeaders,
        credentials: "include",
      });
    } else {
      throw new Error("Token refresh failed");
    }
  }

  return response;
};
