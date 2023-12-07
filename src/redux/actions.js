import {TABLE_RESIZE} from "@/redux/type";

export const tableResize = (data) => {
    return {
        type: TABLE_RESIZE,
        data
    }
}