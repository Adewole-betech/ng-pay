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
        mesh01: "url('/images/bgMesh.png')",
      },
      colors: {
        primary: {
          50: "#F5F5FF",
          100: "#E1E1FE",
          200: "#C3C4FE",
          300: "#9B9DFD",
          400: "#7375FD",
          500: "#4B4EFC",
          main: "#4B4EFC",
          600: "#1E22FB",
          700: "#0408E7",
          800: "#0306BA",
          900: "#02058D",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        darkRed: "#B43218",
        darkGreen: "#027A48",
        neutral50: "#F9FAFB",
        primary50: "#F5F5FF",
      },
      boxShadow: {
        primaryRing: "0px 0px 0px 4px #E1E1FE",
        errorRing: "0px 0px 0px 4px #FEE2E2",
        xSmall: "0px 1px 2px 0px #1018280D",
        outlinedButton: "0px 0px 0px 4px #F3F4F6",
      },
    },
  },
  plugins: [],
};
