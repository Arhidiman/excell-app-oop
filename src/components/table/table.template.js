const CODES = {
    A: 65,
    B: 90
}

function getWidth(state, index) {
    if (state) {
        if (state.colsState) {
            const width = state.colsState[index] || 120
            return width
        } else return 120
    } else return 120
}

function getHeight(state, index) {
    if (state) {
        if (state.rowsState) {
            return state.rowsState[index] || 24
        } else return 24
    } else return 24
}

function createCell(row, state) {
    return function(_, col) {
        return `
            <div 
                style="width: ${getWidth(state, col)}px"
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

function createCol(state) {
    return function(content, col) {
        return `
        <div class="column" data-type="resizable" data-col=${col} style="width: ${getWidth(state, col)}px">
            ${content}
            <div class="col-resize" data-resize="col" draggable="false"></div>
        </div>
    `
    }
}

function createRow(info, data, state) {
    return `
        <div class="row" style="height: ${getHeight(state, info - 1)}px" data-type="resizable" data-row="${info && info - 1}">
            <div class="row-info" draggable="false">
                ${info}
                ${info ? `<div class="row-resize" data-resize="row" draggable="false"></div>` : ""}
            </div>
            <div class="row-data" draggable="false">${data}</div>
        </div>
    `
}

const fromChar = (num, i, a) => String.fromCharCode(CODES.A + i)

export const createTable = (rowsCount = 20, state) => {
    const colsCount = CODES.B - CODES.A + 1
    const tableHeaderCells = new Array(colsCount)
        .fill('')
        .map(fromChar)
        .map(createCol(state))
        .join('')

    const rows = []
    rows.push(createRow("", tableHeaderCells))
    for (let row = 0; row < rowsCount; row++) {
        const tableBodyCells = new Array(colsCount)
            .fill("")
            .map(createCell(row, state))
            .join((""))
        rows.push(createRow(row + 1, tableBodyCells, state))
    }
    return rows.join("")
}