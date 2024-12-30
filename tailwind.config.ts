import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebarBg: "#F7F8FA",
        headerBg: "#F7F8FA",
        activeColor: "#ADB8CC",
        unActiveColor: "#ADB8CC",
        logoColor: "#C9D439",
      },
    },
  },
  plugins: [],
};
export default config;
