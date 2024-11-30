import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Bricolage-Grotesque": ["Bricolage Grotesque ", "sans-serif"],
        custom: ['MyFont', 'sans-serif'],
            },

      colors: {
        golden: "#C2A171", // Add the golden color to Tailwind's color palette
        "gray-custom": "#989898",
        "custom-heading-gradient":
          "linear-gradient(to bottom, #fbedd3, #c3a374)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(267.36deg, #C2A171 0.09%, #D4B37E 15.51%, #FCDB9B 49.49%, #C2A171 95.32%)",
        "custom-gradient-hover":
          "linear-gradient(267.36deg, #A6855B 0.09%, #B89A6A 15.51%, #E0B681 49.49%, #A6855B 95.32%)",
        "custom-heading-gradient":
          "linear-gradient(to bottom, #fbedd3, #c3a374)",
        image: 'url("/bg.png")',
      },
    },
  },
  plugins: [],
} satisfies Config;
