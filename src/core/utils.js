import {defaultStyles} from "@/constants";

export const capitalize = (string) => {
    if (typeof string !== "string") {
        return ""
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const storage = (key, data = null) => {
    if (!data) {
       return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export const isEqual = (a, b) => {
    if (typeof a === typeof b) {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDashCase(string) {
    return string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}
export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelToDashCase(key)}:${styles[key]}`)
        .join(";")
}

export function debounce(fn, wait) {
    let timeout = null
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            fn.apply(this, args)
            // fn(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function preventDefault(event) {
    event.preventDefault()
}
