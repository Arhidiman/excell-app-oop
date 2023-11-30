

export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }
    getRoot() {
        console.log(this.components)
        const $root = document.createElement("div")
        this.components.forEach(Component => {
            const component = new Component()
            $root.appendChild(component.toHTML())
            console.log($root, component.toHTML())
        })
        return $root
    }
    render() {
       this.$el.append(this.getRoot())
    }
}