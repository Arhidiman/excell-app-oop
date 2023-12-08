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
        // this.$on("table:input", ($cell) => {
        //     this.$formula.text($cell.text())
        // })
        // this.$formula.text(this.store.currentText)
        this.$subscribe(state => {
            this.$formula.text(state.currentText)
            console.log("formula state", state.currentText)
        })
    }

    onInput(event) {
        const text = event.target.textContent.trim()
        this.$emit("formula:input", $(event.target).text())
        this.$dispatch(({type: "TEST"}))
    }

    onKeydown(event) {
        const key = event.key
        if(key === "Enter") {
            event.preventDefault()
            this.$emit("formula:enterdown")
        }
    }

    onFocus(event) {

    }

}