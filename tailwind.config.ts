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
        terra: {
          50: "#fdf4ef",
          100: "#fbe3d4",
          200: "#f6c4a5",
          300: "#ef9d72",
          400: "#e77240",
          500: "#dc5a24",
          600: "#c4451a",
          700: "#a33418",
          800: "#832c1a",
          900: "#6b2518",
        },
        cream: {
          50: "#fffdf9",
          100: "#faf7f0",
          200: "#f5efe2",
          300: "#ede2cc",
          400: "#ddd0b0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
