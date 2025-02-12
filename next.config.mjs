import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: [
      "example.com",
      "developers.kakao.com",
      "lh3.googleusercontent.com",
      "k.kakaocdn.net",
      "cdn.balearn.o-r.kr",
    ],
  },
};

export default withPWA(nextConfig);
