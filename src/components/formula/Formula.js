import {ExcelComponent} from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = "excel__formula"

    constructor($root, options) {
        super($root, {
            name: "Formula",
            listeners: ["input"],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">f(x)</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onInput(event) {
        console.log(this.$root)
        console.log("Formula input" ,event)
        const text = event.target.textContent.trim()
        this.emitter.emit('input', text)
    }

}