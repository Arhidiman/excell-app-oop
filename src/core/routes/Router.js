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
        const Page = this.routes.excel
        const page = new Page()
        this.$placeholder.append(page.getRoot())
        page.afterRender()

    }

    destroy() {
        window.removeEventListener("hashchange", this.changePageHandler)
    }
}