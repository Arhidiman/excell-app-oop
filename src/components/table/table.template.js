const CODES = {
    A: 65,
    B: 90
}

const createCell = (content, i) => {
    const dataSymbol = fromChar("", i)
    // console.log(i, dataSymbol)
    return `<div class="cell" contenteditable="" data-col="${dataSymbol}" data-id="${dataSymbol}:${i+1}" draggable="false">${content}</div>`
}

const createCol = (content) => {
    return `
        <div class="column" data-type="resizable">
            ${content}
            <div class="col-resize" data-resize="col" draggable="false"></div>
        </div>
    `
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

export const createTable = (rowsCount = 20) => {
    const colsCount = CODES.B - CODES.A + 1

    const tableHeaderCells = new Array(colsCount)
        .fill('')
        .map(fromChar)
        .map(createCol)
        .join('')

    const tableBodyCells = new Array(colsCount)
        .fill("")
        .map(createCell)
        .join((""))

    const rows = []
    rows.push(createRow("", tableHeaderCells))
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, tableBodyCells))
    }

    return rows.join("")
}