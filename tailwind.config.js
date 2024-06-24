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
                },
            },
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
