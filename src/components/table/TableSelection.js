import Table from "@/components/table/Table"
export class TableSelection {
    constructor($el) {
        this.$el = $el
        this.group = []
    }

    select($el) {
        $el.toHTML().classList.add("selected")
    }

    selectGroup() {

    }
}