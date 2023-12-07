import {capitalize} from "@core/utils";

export class DomListener {
    constructor($root, listeners) {
        if (!$root) {
            throw new Error("No root provided for DomListener")
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach((listener) =>{
            const method = getMethodName(listener)
            const name = this.name || ""
            if (!this[method]) {
                throw new Error(`Method ${method} does not exist in ${name} Component`)
            }
            this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDomListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return "on"+capitalize(eventName)
}
