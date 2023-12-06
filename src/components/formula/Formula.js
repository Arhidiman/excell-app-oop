import {ExcelComponent} from "@/core/ExcelComponent";
import {$} from "@core/dom"
export class Formula extends ExcelComponent {
    static className = "excel__formula"

    constructor($root, options) {
        super($root, {
            name: "Formula",
            listeners: ["input", "keydown", "focus"],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">f(x)</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        this.$formula = this.$root.find(".input")
        this.$on("table:select", ($cell) => {
            this.$formula.text($cell.text())
        })
        this.$on("table:input", ($cell) => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event) {
        const text = event.target.textContent.trim()
        console.log($(event.target))
        this.$emit("formula:input", $(event.target).text())
    }

    onKeydown(event) {
        const key = event.key
        if(key === "Enter") {
            event.preventDefault()
            console.log("EnterDown")
            this.$emit("formula:enterdown")
        }
    }

    onFocus(event) {
        console.log("formula focused")
    }

}