import {ExcelComponent} from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    toHTML() {
        // const element = document.createElement("div")
        // element.innerHTML = "Formula"
        return `
            <div class="info">f(x)</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }
}