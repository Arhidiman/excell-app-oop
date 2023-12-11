
import {$} from "@/core/dom"
import {Emitter} from "@core/Emitter";
import {StoreSubscriber} from "@core/StoreSubscriber";
export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
    }
    getRoot() {
        const $root = $.create("div", "excel")
        $root.$el.classList.add("excel")
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create("div", Component.className)
            const component = new Component($el, componentOptions)
            if (component.name === "Formula") {
                window['c' + component.name] = component
            }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }
    init() {
        console.log("EXCEL INIT!!!")
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach((component, i) => component.init())
    }

    destroy() {
        this.components.forEach(component => component.destroy())
        this.subscriber.unsubscribeFromStore()
    }
}
