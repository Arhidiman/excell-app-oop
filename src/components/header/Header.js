import {ExcelComponent} from "@/core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = "excel__header"
    constructor($root) {
        super($root, {
            name: "Header",
            listeners: []
        })
    }
    toHTML() {
        // const element = document.createElement("div")
        // element.innerHTML = "Header"
        return `
                <input type="text" value="новая таблица" class="input"></input>

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
}