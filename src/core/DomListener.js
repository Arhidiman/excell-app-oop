import {capitalize} from "@core/utils";

export class DomListener {
    constructor($root, listeners) {
        if (!$root) {
            throw new Error("No root provided for DomListener")
        }
        this.$root = $root
        this.listeners = listeners
        // this.onInput = () => console.log('input !!!!!')
    }

    initDomListeners() {
        this.listeners.forEach((listener) =>{
            const method = getMethodName(listener)
            const name = this.name || ""
            if (!this[method]) {
                throw new Error(`Method ${method} does not exist in ${name} Component`)
            }
            // this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
        // console.log(this.listeners)
    }

    removeDomListeners() {
        console.log(this.listeners)
        this.listeners.forEach((listener) => {
            console.log('remove listeners')
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return "on"+capitalize(eventName)
}
