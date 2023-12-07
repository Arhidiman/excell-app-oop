import {DomListener} from "@core/DomListener";
export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.unsubscribers = []
        this.store = options.store
        this.storeSub = null
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
        this.storeSub = this.emitter.subscribe(event, fn)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    }

    // Инициализирует компонент, добавляет DOM слушатели
    init() {
        super.initDomListeners()
    }

    // Удаляет компонент, чистит слушатели
    destroy() {
        this.unsubscribers.forEach(unsub => unsub)
        this.removeDomListeners()
        this.storeSub.unsubscribe()
    }
}