import {ExcelComponent} from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    constructor($root) {
        super($root, {
            name: "Formula",
            listeners: ["input", "click"]
        })
    }

    toHTML() {
        // const element = document.createElement("div")
        // element.innerHTML = "Formula"
        return `
            <div class="info">f(x)</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onInput(event) {
        console.log(this.$root)
        console.log("Formula input" ,event)
    }

    onClick() {
        console.log("click")
    }
}