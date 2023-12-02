
import {$} from "@/core/dom"
export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }
    getRoot() {
        const $root = $.create("div", "excel")
        $root.$el.classList.add("excel")
        this.components = this.components.map(Component => {
            const $el = $.create("div", Component.className)
            const component = new Component($el)

            if (component.name === "Formula") {
                window['c' + component.name] = component
            }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }
    render() {
        this.$el.append(this.getRoot().$el)
        this.components.forEach(component => component.init())
    }
}