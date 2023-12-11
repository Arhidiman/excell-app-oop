import {storage} from "@core/utils";
import {defaultStyles} from "@/constants";


const defaultState = {
    colsState: {
        0: 120
    },
    rowsState: {
        0: 24
    },
    stylesState: {},
    currentText: "",
    cellsDataState: {},
    currentStyle: defaultStyles,
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ""
})

export const initialState = storage("excel-state")
    ? normalize(storage("excel-state"))
    : defaultState