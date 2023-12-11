import {toInlineStyles} from "@core/utils";
import {parse} from "@core/parse";
import {defaultStyles} from "@/constants";

const CODES = {
    A: 65,
    B: 90
}

function getWidth(state, index) {
    if (state) {
        if (state.colsState) {
            return state.colsState[index] || 120
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
        const id = `${row}:${col}`
        const data = state.cellsDataState[id]
        const width = getWidth(state, col)
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        })
        console.log(parse(data))
        return `
            <div 
                style="${styles}; width: ${width}px "
                class="cell" 
                contenteditable="" 
                data-type="cell"
                data-col="${col}" 
                data-id="${id}" 
                data-value="${data || ""}"
                draggable="false"
            >
            ${parse(data) || ""}
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