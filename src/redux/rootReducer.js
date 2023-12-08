import {TABLE_RESIZE} from "@/redux/type";// Pure function
import {SET_CURRENT_TEXT} from "@/redux/type";
import {setCurrentText} from "@/redux/actions";

export const rootReducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case TABLE_RESIZE:
            const field = action.data.resizeType === "col" ? "colsState" : "rowsState"
            const prevState = state[field]
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState} // id, value
        case SET_CURRENT_TEXT :
            state.cellsDataState[action.data.id] = action.data.text
            state.currentText = action.data.text
            return state
        default: return state
    }
}