import {DomListener} from "@core/DomListener";
export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name
        this.emitter = options.emitter
        console.log(options)
    }

    toHTML() {
        return ""
    }

    init() {
        super.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
    }
}