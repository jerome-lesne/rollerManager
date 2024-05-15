document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    const calendar = new FullCalendar.Calendar(calendarEl, {
        views: {
            dayGrid: {
                // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
            },
            timeGrid: {
                // options apply to timeGridWeek and timeGridDay views
            },
            week: {
                // options apply to dayGridWeek and timeGridWeek views
            },
            day: {
                // options apply to dayGridDay and timeGridDay views
            },
        },
        initialView: "timeGridWeek",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        buttonText: {
            today: "Aujourd'hui",
            dayGridMonth: "Mois",
            timeGridWeek: "Semaine",
            timeGridDay: "Jour",
        },
    });
    calendar.setOption("locale", "fr");
    calendar.render();
});
