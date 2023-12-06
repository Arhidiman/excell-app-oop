class DOM {
    constructor(selector) {
        // console.log(typeof selector )
        this.$el = typeof selector === "string"
        ? document.querySelector(selector)
        : selector
        this.data = this.$el.dataset
    }
    html(html) {
        // console.log(typeof html)
        if (typeof html === "string") {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        // console.log(this.$el)

        if (typeof text === "string") {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === "input") {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
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

    id(parce) {
        if (parce) {
            const parcedId = this.data.id.split(":")
            return {
                row: +parcedId[0],
                col: +parcedId[1]
            }
        }
        return this.data.id
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
    }

    focus() {
        this.$el.focus()
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