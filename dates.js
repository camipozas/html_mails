function formattedDate(d) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/");
}

// Obtener número de la semana (La semana empieza los Lunes)
function getWeek(date) {
    return Number(Utilities.formatDate(new Date(date), "GMT-4", "u")) === 7
        ? Number(Utilities.formatDate(new Date(date), "GMT-4", "w")) - 1
        : Number(Utilities.formatDate(new Date(date), "GMT-4", "w"));
}
