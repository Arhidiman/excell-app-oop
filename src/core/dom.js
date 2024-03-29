class DOM {
    constructor(selector) {
        this.$el = typeof selector === "string"
        ? document.querySelector(selector)
        : selector
        this.data = this.$el.dataset
    }
    html(html) {
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

    text(text) {
        console.log(text)

        if (text !== undefined) {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === "input") {
            return this.$el.value.trim()
        }
        console.log("text is undefined")
        return this.$el.textContent.trim()
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
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

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
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

    getStyles(styles= []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
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