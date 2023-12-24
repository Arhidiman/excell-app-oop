

function createButton(data) {
     const dataAttributes = `
        data-type="button"
        data-value=${JSON.stringify(data.value)}
    `

    return `
        <div class="button ${data.active ? "active" : ""}" ${dataAttributes}>
            <span class="material-icons" ${dataAttributes}>${data.icon}</span>
        </div>
    `
}

export function createToolbar(state) {

    const buttonsData = [
        {
            icon: "format_align_left",
            active: state["justifyContent"] === "left",
            value: {justifyContent: state["justifyContent"] === "left" ? "auto" : "left"}
        },
        {
            icon: "format_align_center",
            active: state["justifyContent"] === "center",
            value: {justifyContent: state["justifyContent"] === "center" ? "auto" : "center"}
        },
        {
            icon: "format_align_right",
            active: state["justifyContent"] === "right",
            value: {justifyContent: state["justifyContent"] === "right" ? "auto" : "right"}
        },
        {
            icon: "format_bold",
            active: state["fontWeight"] === "bold",
            value: {fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold"}
        },
        {
            icon: "format_italic",
            active: state["fontStyle"] === "italic",
            value: {fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic"}
        },
        {
            icon: "format_underlined",
            active: state["textDecoration"] === "underline",
            value: {textDecoration: state["textDecoration"] === "underline" ? "none" : "underline"}
        }
    ]
    return buttonsData.map(createButton).join("")
}

