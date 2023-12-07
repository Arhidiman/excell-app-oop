import {TABLE_RESIZE} from "@/redux/type";// Pure function

export const rootReducer = (state, action) => {
    switch (action.type) {
        case TABLE_RESIZE:
            let colsState = state.colsState
            colsState[action.data.id] = action.data.colWidth
            return {...state, colsState: colsState} // id, value
        default: return state
    }
}

const state = {
    prop1: 1,
    prop2: 2
}

const newState = {
    ...state, prop1: 29
}