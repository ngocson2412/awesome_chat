var express = require("express")
var app = express()

var hostname = "localhost"

var port = 3000

app.get("/helloworld",(req, res) => {
    res.send("<h1>hello world !!</h1>")
})

app.listen(port, hostname, () =>{
    console.log(`server running at ${hostname}:${port}`)
})
