import {Router} from "./Router";
import {Page} from "../Page";

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement("div")
        root.innerHTML = "dashboard"
        return root
    }
}
class ExcellPage extends Page {

}
describe("Router", () => {
    let router
    let $root
    beforeEach(() => {
        $root = document.createElement($root, "div")
        router = new Router({
            dashboard: DashboardPage,
            excel: ExcellPage
        })
    })
    test("should be defined", () => {
        expect(router).toBeDefined()
    })
    test("should render dashboard page", () => {
        router.changePageHandler()
        expect($root.innerHTML).toBe("<div>dashboard</div>")
    })
})


