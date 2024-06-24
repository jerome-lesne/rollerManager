const themeToggleCheckbox = document.getElementById("theme-toggle");

if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener("change", () => {
        const html = document.documentElement;
        if (themeToggleCheckbox.checked) {
            html.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (themeToggleCheckbox) {
        themeToggleCheckbox.checked = savedTheme === "dark";
    }
});
