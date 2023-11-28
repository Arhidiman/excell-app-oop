console.log("Module.js")

const start = async() => {
    return await Promise.resolve('async working')
}

start().then(console.log)