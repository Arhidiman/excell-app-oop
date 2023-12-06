import {DomListener} from "@core/DomListener";
export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.unsubscribers = []
        console.log(options)
    }


    // Возвращает шаблон компонента
    toHTML() {
        return ""
    }

    // Уведомляем слушатели про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    // Инициализирует компонент, добавляет DOM слушатели
    init() {
        super.initDomListeners()
    }

    // Удаляет компонент, чистит слушатели
    destroy() {
        this.unsubscribers.forEach(unsub => unsub)
        this.removeDomListeners()
    }
}