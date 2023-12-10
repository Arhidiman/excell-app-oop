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