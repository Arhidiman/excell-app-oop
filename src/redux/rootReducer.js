import {TABLE_RESIZE, CHANGE_STYLES} from "@/redux/type";// Pure function
import {SET_CURRENT_TEXT} from "@/redux/type";
import {setCurrentText} from "@/redux/actions";

export const rootReducer = (state, action) => {
    let prevState = {}
    let field = ""
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.resizeType === "col" ? "colsState" : "rowsState"
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState} // id, value
        case SET_CURRENT_TEXT:
            state.cellsDataState[action.data.id] = action.data.text
            state.currentText = action.data.text
            return state
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        default: return state
    }
}