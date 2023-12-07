import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arima: ["var(--font-arima)"],
        dancing: ["var(--font-dancing-script)"],
      },
      colors: {
        black_text: "#353535",
        light_gray: "#f5f4f2",
        bold_gray: "#e8e7e5",
        light_pink: "#F0E8E7",
        bold_pink: "#D8C4C3",
        admin_primary: "#c3224a",
        admin_black_text: "#333333",
        admin_gray_text: "#999999",
      },
      transitionProperty: {
        width: "width",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "150ch",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
