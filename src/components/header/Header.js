import {ExcelComponent} from "@/core/ExcelComponent";

export class Header extends ExcelComponent {
    toHTML() {
        const element = document.createElement("div")
        element.innerHTML = "Header"
        return element
    }
}