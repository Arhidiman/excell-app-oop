export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // Уведомляем слушатели событий
    // table.emit("table:select", {a:1})
    emit(event, ...args) {
        if (!Array.isArray((this.listeners[event]))) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // Подписываемся на уведомление
    // formula.subscribe("table:select", () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
             return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
