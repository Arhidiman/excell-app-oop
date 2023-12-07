export const createStore = (rootReducer, initialState = {}) => {
    let state = rootReducer(initialState, {type: "__INIT__"})
    let listeners = []

    return {
        subscribe(fn) {
            console.log(fn)
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(listener => listener !== fn)
                }
            }
        },
        dispatch(action) {
            console.log(listeners)
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },
        getState() {
            return state
        }
    }
}
