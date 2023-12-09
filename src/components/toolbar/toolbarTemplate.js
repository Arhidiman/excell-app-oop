

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
    console.log(state["fontWeight"])
    console.log(state)

    const buttonsData = [
        {
            icon: "format_align_left",
            active: false,
            value: {textAlign: "left"}
        },
        {
            icon: "format_align_center",
            active: true,
            value: {textAlign: 'center'}
        },
        {
            icon: "format_align_right",
            active: false,
            value: {textAlign: 'right'}
        },
        {
            icon: "format_bold",
            active: state["fontWeight"] === "bold",
            value: {fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold"}
        },
        {
            icon: "format_italic",
            active: false,
            value: {fontStyle: 'italic'}
        },
        {
            icon: "format_underlined",
            active: false,
            value: {textDecoration: 'underline'}
        }
    ]
    return buttonsData.map(createButton).join("")
}

