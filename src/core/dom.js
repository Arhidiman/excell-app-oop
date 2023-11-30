class DOM {
    constructor(selector) {
        // console.log(typeof selector )
        this.$el = typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
        console.log("selector", selector)
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

    append(node) {
       if (Element.prototype.append) {
           this.$el.append(node.$el)
       } else {
           this.$el.appendChild((node.$el))
       }
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