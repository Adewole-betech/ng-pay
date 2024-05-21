/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#4B4EFC",
        darkRed: "#B43218",
        darkGreen: "#027A48",
        primary300: "#9B9DFD",
        primary600: "#1E22FB",
        primary100: "#E1E1FE",
        neutral500: "#6B7280",
        neutral700: "#374151",
        neutral400: "#9CA3AF",
        neutral300: "#D1D5DB",
        neutral50: "#F9FAFB",
        primary50: "#F5F5FF",
      },
      boxShadow: {
        input: "0px 0px 0px 4px #E1E1FE",
      },
    },
  },
  plugins: [],
};
