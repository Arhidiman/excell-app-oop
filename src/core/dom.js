class DOM {
    constructor(selector) {
        // console.log(typeof selector )
        this.$el = typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
        // console.log("selector", selector)
    }
    html(html) {
        // console.log(typeof html)
        if (typeof html === "string") {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    clear() {
        this.html('')
        return this
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        console.log("off method works")
        this.$el.removeEventListener(eventType, callback)
    }
    append(node) {
       if (Element.prototype.append) {
           this.$el.append(node.$el)
       } else {
           this.$el.appendChild((node.$el))
       }
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    findAll(selector) {
        const elements = []
        const collection = this.$el.querySelectorAll(selector)
        collection.forEach(element => elements.push($(element)))
        return elements
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    addClass(className) {
        this.$el.classList.add(className)
    }

    removeClass(className) {
        this.$el.classList.remove(className)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
    }
}

export const $ = (selector) => new DOM(selector)

$.create = (tagName, classes="") => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}