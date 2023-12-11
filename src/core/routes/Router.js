import {$} from "@core/dom"
import {ActiveRoute} from "@core/routes/ActiveRoute";
export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error("Selector is not provided in router")
        }
        this.$placeholder = $(selector)
        // this.$placeholder = document.getElementById("app")
        this.routes = routes
        this.init()
        this.param = "some param"
        this.changePageHandler = this.changePageHandler.bind(this)
    }
    init() {
        window.addEventListener("hashchange", this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler = () => {
        // console.log(ActiveRoute.path)
        // console.log(ActiveRoute.param)
        console.log(this.$placeholder)
        console.log(this)
        this.$placeholder.html(`<h1>${ActiveRoute.path}<h1/>`)
    }

    destroy() {
        window.removeEventListener("hashchange", this.changePageHandler)
    }
}