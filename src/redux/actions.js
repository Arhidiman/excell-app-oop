import {CURRENT_STYLE, TABLE_RESIZE, CHANGE_STYLES} from "@/redux/type";
import {SET_CURRENT_TEXT} from "@/redux/type";

export const tableResize = (data) => {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export const setCurrentText = (data) => {
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