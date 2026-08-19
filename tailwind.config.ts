import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}", "./providers/**/*.{ts,tsx}", "./shared/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B2545",
        secondary: "#C59B27",
        background: "#FAFAFA",
        ink: "#131A22",
        muted: "#7F8C8D"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"]
      },
      maxWidth: { container: "1200px" },
      boxShadow: { soft: "0 12px 35px rgba(11,37,69,.08)" }
    }
  },
  plugins: []
};
export default config;
