/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/*.html.twig", "./views/**/*.html.twig"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
