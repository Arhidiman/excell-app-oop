import {ExcelComponent} from "@/core/ExcelComponent";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {$} from "@/core/dom";
import {debounce} from "@core/utils";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
    static className = "excel__header"
    constructor($root, options) {
        super($root, {
            name: "Header",
            listeners: ["input", "click"],
            ...options
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        console.log("TITLE:", title)
        return `
                <input type="text" value="${title}" class="input"></input>
                <div>
                    <div class="button" data-button="exit">
                        <span class="material-icons" data-button="exit">logout</span>
                    </div>
                    <div class="button" data-button="remove">
                        <span class="material-icons" data-button="remove">delete</span>
                    </div>
                </div>
            `
    }

    onInput(event) {
        console.log("input")
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }

    onClick(event) {
        const $target = $(event.target)
        console.log($target.data.button)

        if ($target.data.button === "remove") {
            const decicion = confirm("Вы действительно хотите удалить эту таблицу ?")
            if(decicion) {
                localStorage.removeItem("excel" + ActiveRoute.param)
                ActiveRoute.navigate("")
            }
        } else if ($target.data.button === "exit") {
            ActiveRoute.navigate("")
        }
    }
}