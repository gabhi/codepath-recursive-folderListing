let http = require('http')
let fs = require('fs')
let folderArray = []

require('songbird')




http.createServer((req, res) => {
    folderArray = []
    res.setHeader('Content-Type', 'application/json')

    let folderName = req.url
    async() => {
        await read(folderName)
        res.end(JSON.stringify(folderArray))
    }()

}).listen(8000, '127.0.0.1')
console.log('Server running at http://127.0.0.1:8000/')


async
function read(folderName) {
    let stat = await fs.promise.stat(folderName)

    if (!stat.isDirectory()) {
        folderArray.push(folderName)
        return
    }
    let process = []
    let files = await fs.promise.readdir(folderName)

    for (let item of files) {
        process.push(read(folderName + '/' + item))
    }
    let results = await Promise.all(process)
}
