//this function takes a 2d array as input and creates a table.
//Major entity
//A <table> a table
// <tr> a row
//<th>  a col
//<td> a cell.

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');
        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
 
    return table;
}

function create(entity) {
    window[entity] = onEvent;
}