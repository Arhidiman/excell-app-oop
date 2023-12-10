export class TableSelection {
    static selectedClassname = "selected"
    constructor($table) {
        this.group = []
        this.$table = $table
    }

    select($el) {
        this.clear()
        $el.addClass("selected")
        this.$current = $el
        this.group.push($el)
     }

     clear() {
         const selectedCells = this.$table.findAll(`.${TableSelection.selectedClassname}`)
         selectedCells.forEach($cell => $cell.removeClass(TableSelection.selectedClassname))
         this.group = []
     }

     get selectedIds() {
        return this.group.map($el => $el.id())
     }

    selectGroup($elements) {
        this.clear()
        console.log($elements)
        $elements && $elements.forEach($el => this.group.push($el))
        $elements && $elements.forEach($element => $element.addClass(TableSelection.selectedClassname))
    }

    applyStyle(style) {
        console.log(this.group)
        this.group.forEach($el => $el.css(style))
    }
}