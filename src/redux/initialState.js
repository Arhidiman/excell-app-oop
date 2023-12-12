import {defaultStyles, defaultTitle} from "@/constants";
import {cloneObj} from "@core/utils";

const defaultState = {
    title: defaultTitle,
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
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ""
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : cloneObj(defaultState)
}