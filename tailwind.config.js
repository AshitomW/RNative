/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components//**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2A4364", // Deep blue, a variation from the original
        secondary: {
          DEFAULT: "#F39C12", // Warm orange, slightly different from original
          100: "#F4A142",
          200: "#F5A762",
        },
        black: {
          DEFAULT: "#121212", // Slightly softer black
          100: "#1A1A2A", // Dark slate blue
          200: "#2A2A3A", // Lighter dark slate
        },
        gray: {
          100: "#E0E0E8", // Lighter gray with a hint of blue
          200: "#D1D1D9", // Additional gray variant
        },
        accent: {
          blue: "#4A90E2", // Bright accent blue
          green: "#2ECC71", // Fresh green
          red: "#E74C3C", // Vibrant red
        },
      },
      fontFamily: {
        // Keeping the Poppins variations
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      // Additional theme extensions
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        large: "1rem",
      },
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },

  plugins: [],
};
