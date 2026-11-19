import withPWAInit, { runtimeCaching } from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  workboxOptions: {
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ url }) => /^\/(api|idp|oauth2|oauth|login|ws|dashboard|calendars|chat|files|achieve|setting)(\/|$)/.test(url.pathname),
        handler: "NetworkOnly",
      },
      ...runtimeCaching,
    ],
  },
});

function imagePattern(address, pathname) {
  const url = new URL(address);
  return {
    protocol: url.protocol.slice(0, -1),
    hostname: url.hostname,
    port: url.port,
    pathname: pathname ?? `${url.pathname.replace(/\/$/, "")}/**`,
  };
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const deploymentId = process.env.BALEARN_DEPLOYMENT_ID;
const mediaPatterns = [
  imagePattern(apiUrl, "/media/**"),
  ...(process.env.MEDIA_IMAGE_BASE_URLS || "").split(",")
    .map((url) => url.trim())
    .filter(Boolean)
    .map((url) => imagePattern(url)),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  ...(deploymentId && { deploymentId, generateBuildId: async () => deploymentId }),
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    // A browser can reach the host API on loopback even when Next.js runs in a container.
    unoptimized: process.env.DIRECT_MEDIA_IMAGES === "1"
      || ["localhost", "127.0.0.1", "[::1]"].includes(new URL(apiUrl).hostname),
    remotePatterns: [
      ...mediaPatterns,
      { protocol: "http", hostname: "img1.kakaocdn.net", pathname: "/thumb/**" },
      { protocol: "https", hostname: "img1.kakaocdn.net", pathname: "/thumb/**" },
      imagePattern("https://developers.kakao.com"),
      imagePattern("https://lh3.googleusercontent.com"),
      imagePattern("https://k.kakaocdn.net"),
      imagePattern("https://cdn.balearn.o-r.kr"),
    ],
  },
};

export default withPWA(nextConfig);
