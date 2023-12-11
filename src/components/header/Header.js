import {ExcelComponent} from "@/core/ExcelComponent";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {$} from "@/core/dom";
import {debounce} from "@core/utils";

export class Header extends ExcelComponent {
    static className = "excel__header"
    constructor($root, options) {
        super($root, {
            name: "Header",
            listeners: ["input"],
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
                    <div class="button">
                        <span class="material-icons">logout</span>
                    </div>
                    <div class="button">
                        <span class="material-icons">delete</span>
                    </div>
                </div>
            `
    }

    onInput(event) {
        console.log("input")
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}