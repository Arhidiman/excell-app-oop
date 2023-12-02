const CODES = {
    A: 65,
    B: 90
}

const createCell = (content) => {
    return `<div class="cell" contenteditable="">${content}</div>`
}

const createCol = (content) => {
    return `
        <div class="column">
            ${content}
            <div class="col-resize"></div>
        </div>
    `
}

const createRow = (info, data) => {
    console.log(info)
    return `
        <div class="row">
            <div class="row-info">
                ${info}
                ${info ? `<div class="row-resize"></div>` : ""}
            </div>
            <div class="row-data">${data}</div>
        </div>
    `
}

const fromChar = (num, i) => String.fromCharCode(CODES.A + i + 1)
export const createTable = (rowsCount = 20) => {
    const colsCount = CODES.B - CODES.A

    const tableHeaderCells = new Array(colsCount)
        .fill('')
        .map(fromChar)
        .map(createCol)
        .join('')

    const tableBodyCells = new Array(colsCount)
        .fill(createCell(""))
        .join((""))

    const rows = []
    rows.push(createRow("", tableHeaderCells))
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, tableBodyCells))
    }

    return rows.join("")
}