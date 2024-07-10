/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/*.html.twig", "./views/**/*.html.twig"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    secondary: "#FCB040",
                },
            },
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    secondary: "#FCB040",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
