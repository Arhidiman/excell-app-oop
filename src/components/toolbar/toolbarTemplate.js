const buttonsData = [

    {
        icon: "format_align_left",
        active: false,
        value: {"textAlign": "left"}
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
        active: true,
        value: {fontStyle: 'bold'}
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

function createButton(data) {
    const dataValue = JSON.stringify(data.value)
    console.log(JSON.parse(dataValue))
    // console.log(dataValue)
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

export function createToolbar() {
    return buttonsData.map(createButton).join("")
}

