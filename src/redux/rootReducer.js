import {TABLE_RESIZE} from "@/redux/type";// Pure function

export const rootReducer = (state, action) => {
    switch (action.type) {
        case TABLE_RESIZE:
            const field = action.data.resizeType === "col" ? "colsState" : "rowsState"
            const prevState = state[field]
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState} // id, value
        default: return state
    }
}