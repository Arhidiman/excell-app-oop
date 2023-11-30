
import {$} from "@/core/dom"
export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }
    getRoot() {
        const $root = $.create("div")
        console.log(this.components)
        $root.classList.add("excel")
        this.components.forEach(Component => {
            const $el = $.create("div", Component.className)
            const component = new Component($el)
            $el.innerHTML = component.toHTML()
            $root.append($el)

            console.log($root, component.toHTML())
        })
        return $root
    }
    render() {
       this.$el.append(this.getRoot())
    }
}