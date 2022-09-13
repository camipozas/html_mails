/**
 * It checks if the user can request a slot for the given date
 * @param email - the email of the user who is requesting the reservation
 * @param fecha - the date you want to check
 * @returns A boolean value
 */
function verificarRestriccionUsuario(email, fecha) {
    const fechaObject = stringToDate(fecha);

    const difference = calculateDaysDifference(fechaObject);
    // Puede solicitar un cupo para máximo 7 días corridos incluyendo el mismo dia
    if (!(difference >= 0 && difference <= 7)) return false;

    // Chequear que no esté en otra fila DEUDA TÉCNICA
    // Chequear historial
    const hojaHistorial = obtenerHojaPrincipal().getSheetByName("Historial");
    const mismoDia = findValues(hojaHistorial, "C2:C", 2, fecha);
    console.log(mismoDia);
    // Chequear que no pueda pedir para el mismo dia dos veces
    if (mismoDia.includes(email)) return false;
    //Chequear si ya tiene una reserva esa semana
    const semana = getWeek(fechaObject);
    const mismaSemana = findValues(hojaHistorial, "D2:D", 2, semana);
    if (mismaSemana.filter((data) => data == email).length >= 2) return false;
    // Si no se cumplen las condiciones anteriores entonces puede pedir
    console.log(mismaSemana);
    return true;
}

function test() {
    const hola = new Date("Sept 05, 22");
    verificarRestriccionUsuario("cpozas@buk.cl", formattedDate(hola));
}

/**
 * It takes a date as an argument and returns the number of days between that date and today
 * @param dateCalculate - The date you want to calculate the difference from.
 * @returns The difference in days between the date passed in and today.
 */
function calculateDaysDifference(dateCalculate) {
    const today = new Date();
    const differenceInTime = dateCalculate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
}

/**
 * It takes a string in the format dd/mm/yyyy and returns a Date object
 * @param fecha - The date string to convert.
 * @returns A date object
 */
function stringToDate(fecha) {
    const fechaParts = fecha.split("/");
    const fechaObject = new Date(
        +fechaParts[2],
        fechaParts[1] - 1,
        +fechaParts[0]
    );
    return fechaObject;
}

/**
 * It searches for a value in a range of cells and returns the value of the cell in the same row but in
 * a different column
 * @param hoja - the sheet you want to search in
 * @param range - The range of cells to search.
 * @param indexCol - The column index of the value you want to return.
 * @param valueToSearch - The value you want to search for.
 * @returns An array of values from the column indexCol
 */
function findValues(hoja, range, indexCol, valueToSearch) {
    return hoja
        .getRange(range)
        .createTextFinder(valueToSearch)
        .findAll()
        .map(
            (data) => hoja.getRange(data.getRow(), indexCol).getValues()[0][0]
        );
}
