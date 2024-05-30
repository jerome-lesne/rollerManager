const Twig = require("twig");

Twig.extendFilter("french_date", (value, format) => {
    if (!value) return "";
    const date = new Date(value);
    const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    const formatter = new Intl.DateTimeFormat("fr-FR", options);
    return formatter.format(date);
});

Twig.extendFilter("french_date_day", (value) => {
    if (!value) return "";
    const date = new Date(value);
    const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("fr-FR", options);
    return formatter.format(date);
});
