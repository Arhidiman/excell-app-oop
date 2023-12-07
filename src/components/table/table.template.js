const CODES = {
    A: 65,
    B: 90
}



// const createCell = (row, col) => {
//     return `<div class="cell" contenteditable="" data-col="${col}" data-id="${row}:${col}" draggable="false"></div>`
// }

function createCell(row, initialData) {
    return function(_, col) {
        return `
            <div 
                style="width: ${initialData[col]}px"
                class="cell" 
                contenteditable="" 
                data-type="cell"
                data-col="${col}" 
                data-id="${row}:${col}" 
                draggable="false"
            >
            </div>
        `
    }
}

function createCol(initialData) {
    return function(content, col) {
        return `
        <div class="column" data-type="resizable" data-col=${col} style="width: ${initialData[col]}px">
            ${content}
            <div class="col-resize" data-resize="col" draggable="false"></div>
        </div>
    `
    }
}

const createRow = (info, data) => {
    return `
        <div class="row" data-type="resizable">
            <div class="row-info" draggable="false">
                ${info}
                ${info ? `<div class="row-resize" data-resize="row" draggable="false"></div>` : ""}
            </div>
            <div class="row-data" draggable="false">${data}</div>
        </div>
    `
}

const fromChar = (num, i, a) => String.fromCharCode(CODES.A + i)

export const createTable = (rowsCount = 20, initialData) => {
    const colsCount = CODES.B - CODES.A + 1

    const tableHeaderCells = new Array(colsCount)
        .fill('')
        .map(fromChar)
        .map(createCol(initialData))
        .join('')

    const rows = []
    rows.push(createRow("", tableHeaderCells))
    for (let row = 0; row < rowsCount; row++) {
        const tableBodyCells = new Array(colsCount)
            .fill("")
            .map(createCell(row, initialData))
            .join((""))
        rows.push(createRow(row + 1, tableBodyCells))
    }

    return rows.join("")
}