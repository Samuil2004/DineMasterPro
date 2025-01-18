// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       boxShadow: {
//         custom: "0px 0px 50px rgba(34, 31, 32, 1)", //used for the logo shadow
//         cart: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add this line
//       },
//       colors: {
//         "custom-gray": "rgb(225, 223,222, 255)", //Used for the preview page
//         // "custom-gray": "rgb(223,223,223)", //Used for the preview page
//         "custom-blue": "rgb(171, 211,223)", //Used for the preview page
//         "custom-green": "rgb(31, 195, 106)", // Used for the cart
//       },
//     },
//   },
//   plugins: [],
// };
// // 171,211,223

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 0px 50px rgba(34, 31, 32, 1)", //used for the logo shadow
        cart: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add this line
      },
      colors: {
        "custom-gray": "rgb(225, 223,222, 255)", //Used for the preview page
        // "custom-gray": "rgb(223,223,223)", //Used for the preview page
        "custom-blue": "rgb(171, 211,223)", //Used for the preview page
        "custom-green": "rgb(31, 195, 106)", // Used for the cart
      },
      animation: {
        pulseColor: "pulseColor 1.5s ease-in-out infinite",
      },
      keyframes: {
        pulseColor: {
          "0%": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#000", // Black text color
            boxShadow: "0 0 20px rgba(255, 0, 0, 0.7)", // Glowing red effect
            transform: "scale(1)", // Normal size
          },
          "50%": {
            backgroundColor: "rgba(255, 0, 0, 0.8)", // Red background
            color: "#fff", // White text color during red background
            boxShadow: "0 0 30px rgba(255, 0, 0, 1)", // Strong glowing red
            transform: "scale(1.05)", // Slight scale up
          },
          "100%": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#000", // Black text color
            boxShadow: "0 0 20px rgba(255, 0, 0, 0.7)", // Glowing red effect
            transform: "scale(1)", // Normal size
          },
        },
      },
      backgroundImage: {
        "welcome-banner": "url('/images/welcomingBanner')",
      },
    },
  },
  plugins: [],
};
// 171,211,223
