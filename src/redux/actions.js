import {SET_CURRENT_TEXT, TABLE_RESIZE, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE} from "@/redux/type";

export const tableResize = (data) => {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export const setCurrentText = (data) => {
    console.log("SET CURRENT TEXT ", data)
    return {
        type: SET_CURRENT_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

// value, data
export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}