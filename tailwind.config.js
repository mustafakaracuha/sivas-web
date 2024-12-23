/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                slideLeft: "slideLeft 10s linear infinite",
                slideRight: "slideRight 10s linear infinite",
            },
            keyframes: {
                slideLeft: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                slideRight: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
        },
    },
    plugins: [],
};
