function obtenerHojaPrincipal() {
    const SCRIPT_PROPERTIES =
        PropertiesService.getScriptProperties().getProperties();
    const HOJA = SpreadsheetApp.openById(
        SCRIPT_PROPERTIES["15uIIy_DfrBNWM44nZmuvskvNaYwxyoMZ4sXY8GPRooM"]
    );
    return HOJA;
}

function findValues(hoja, range, indexCol, valueToSearch) {
    return hoja
        .getRange(range)
        .createTextFinder(valueToSearch)
        .findAll()
        .map(
            (data) => hoja.getRange(data.getRow(), indexCol).getValues()[0][0]
        );
}
