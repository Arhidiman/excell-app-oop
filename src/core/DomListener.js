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
            console.log(method)
            console.log(this)
            // console.log(this.$root)
            const name = this.name || ""
            if (!this[method]) {
                throw new Error(`Method ${method} does not exist in ${name} Component`)
            }
            this.$root.on(listener, this[method].bind(this))
        })
        // console.log(this.listeners)
    }

    removeDomListeners() {

    }
}

function getMethodName(eventName) {
    return "on"+capitalize(eventName)
}
