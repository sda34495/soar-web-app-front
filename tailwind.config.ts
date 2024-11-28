import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(267.36deg, #C2A171 0.09%, #D4B37E 15.51%, #FCDB9B 49.49%, #C2A171 95.32%)',
      },

      fontFamily:{
        'Bricolage-Grotesque': ["Bricolage Grotesque ", 'sans-serif'],
       
      
                                                
                                                
                                                
      },


      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
