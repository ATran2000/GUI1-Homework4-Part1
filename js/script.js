/*
Assignment: Homework4 - Part1: Validation Plugin
Name: Alvin Tran
Contact Information: Alvin_Tran@student.uml.edu
Date: 11/22/2021
Resources Used: https://jqueryvalidation.org/
*/

/*
When the body of the html file is finished loading in, this script is ran. What this script does
is that it validates the form before it is sent. If the values are incorrect, then error
messages would be shown saying what is incorrect.
*/
$(document).ready(function() {
    validator = $("#myForm").validate({
        errorElement: "div",  // Puts the error messages into a div so that it can be placed below input
        rules: {  // Specific rules for what valid
            minRow: {
                required: true,  // Must have input
                integer: true,  // Must be non-decimal value
                range: [-50, 50],  // Must be between -50 and 50, inclusive
            },
            maxRow: {
                required: true,
                integer: true,
                range: [-50, 50],
            },
            minCol: {
                required: true,
                integer: true,
                range: [-50, 50],
            },
            maxCol: {
                required: true,
                integer: true,
                range: [-50, 50],
            }
        },
        messages: {  // Custom messages for the rules
            minRow: {
                integer: "Value must be an integer value.",
            },
            maxRow: {
                integer: "Value must be an integer value.",
            },
            minCol: {
                integer: "Value must be an integer value.",
            },
            maxCol: {
                integer: "Value must be an integer value.",
            }
        }
    })
})

/*
When the submit button is clicked, this script is ran which would build the table if the
form is valid.
*/
document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();  // Prevents full submission and reloading the page

    if (validator.form()) {  // If form is validated, receive the form and build table
        receiveForm();
    }
})

/*
After clicking the submit button, the receiveForm function is called.
The receiveForm function gets the minimum and maximum row/column values that will be used
to create the multiplication table and then make calls to the deleteTable, validateForm, and
createTable functions.
*/
function receiveForm() {
    var minRow = parseFloat(document.getElementById("minRow").value);  // get minRow value, turn string into float
    var maxRow = parseFloat(document.getElementById("maxRow").value);  // get maxRow value, turn string into float
    var minCol = parseFloat(document.getElementById("minCol").value);  // get minCol value, turn string into float
    var maxCol = parseFloat(document.getElementById("maxCol").value);  // get maxCol value, turn string into float

    // If the maximum row is less than the minimum row, swap the values
    if (maxRow < minRow) {
        var tmp = maxRow;
        maxRow = minRow;
        minRow = tmp;
    }

    // If the maximum column is less than the minimum column, swap the values
    if (maxCol < minCol) {
        tmp = maxCol;
        maxCol = minCol;
        minCol = tmp;
    }

    deleteTable(minRow, maxRow, minCol, maxCol);  // delete any existing table
    createTable(minRow, maxRow, minCol, maxCol);  // everything is all set, create the table with inputted values
}

/*
The deleteTable function will delete any existing table. It does this by getting the number
of rows of the table, even if there isn't any, and it will go through a for loop to delete
the rows until there is none.
*/
function deleteTable(minRow, maxRow, minCol, maxCol) {
    var table_length = document.getElementById("multiplication_table").rows.length;  // get table length

    if (table_length) {  // if table have rows, it exists, go to delete it
        document.getElementById("multiplication_table").innerHTML="";  // make the table empty
    }
}

/*
Dynamically creates the multiplication table using the inputted values from the form.
As the table is created, table rows, table headers, and table data elements gets 
included into to the HTML file.
*/
function createTable(minRow, maxRow, minCol, maxCol) {
    var table = document.getElementById("multiplication_table");

    // Add 2 to numRows, numCols because ...
    //      max-min doesn't give total number of rows so add 1
    //      table headers so add 1 more
    var numRows = maxRow - minRow + 2;
    var numCols = maxCol - minCol + 2;

    var rowCount, colCount;
    var cellValue;
    var tableRow, tableHeader, tableData;

    // Writes very first cell of the multiplication table.
    // First cell contains nothing.
    tableRow = document.createElement("tr");  // creates HTML element "tr" (table row)
    tableRow = table.insertRow(0);  // insert a table row at table row index 0
    tableHeader = document.createElement("th");  // creates an HTML element "th" (table header)
    cellValue = "";
    tableHeader.innerHTML = cellValue;
    tableRow.appendChild(tableHeader);  // include the tableHeader into the tableRow

    // Writes the very first row of our multiplication table through a for loop.
    // First row contatains the minimum column to the maximum column values.
    // All headers.
    for (colCount = 1; colCount < numCols; colCount++) {  // note colCount = 1 because column 1 contains values for minRow to maxRow
        tableHeader = document.createElement("th");
        cellValue = colCount + minCol - 1;
        tableHeader.innerHTML = cellValue;
        tableRow.appendChild(tableHeader);
    }

    // Write rest of the rows of our multiplication table through 2 for loops where we go row by row and column by column.
    // Rows will consist of table headers for minimum row to the maximum row values as well as table data of the product of 
    // minRow to maxRow values by minCol to maxCol values.
    for (rowCount = 1; rowCount < numRows; rowCount++) {  // // note rowCount = 1 because row 1 contains values for minCol to maxCol
        tableRow = document.createElement("tr");
        tableRow = table.insertRow(rowCount);

        for (colCount = 0; colCount < numCols; colCount++) {
            if (colCount == 0) {  // colCount == 0, means it is the minRow to maxRow column, make them into headers
                tableHeader = document.createElement("th");
                cellValue = rowCount + minRow - 1;
                tableHeader.innerHTML = cellValue;
                tableRow.appendChild(tableHeader);
            } else {  // not colCount == 0, means it is the product between minRow to maxRow by minCol by maxCol
                tableData = document.createElement("td")
                cellValue = (rowCount + minRow - 1) * (colCount + minCol - 1);
                tableData.innerHTML = cellValue;
                tableRow.appendChild(tableData);
            }
        }
    }
}