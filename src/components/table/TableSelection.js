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
     }

     clear() {
         const selectedCells = this.$table.findAll(`.${TableSelection.selectedClassname}`)
         selectedCells.forEach($cell => $cell.removeClass(TableSelection.selectedClassname))
     }

    selectGroup($elements) {
        this.clear()
        $elements && $elements.forEach($element => $element.addClass(TableSelection.selectedClassname))
    }
}