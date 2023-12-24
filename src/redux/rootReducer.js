import {
    TABLE_RESIZE,
    CHANGE_STYLES,
    APPLY_STYLE,
    CHANGE_TITLE,
    SET_CURRENT_TEXT,
    UPDATE_DATE
} from "@/redux/type";// Pure function

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
        case APPLY_STYLE:
            field = "stylesState"
            const val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_TITLE:
            return {...state, title: action.data}
        case UPDATE_DATE:
            return {...state, openedDate: new Date().toJSON()}
        default: return state
    }
}