import type { Config } from "tailwindcss";


const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: "class",
    theme: {
        extend:{
            colors:{
                primary:{
                    DEFAULT: "#610b893f"
                },
                secondary:{
                    DEFAULT: "#050505a8"
                }
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;