import express from "express"
import ConnectDB from "./config/connectDB"
import ContactModel from "./models/contact.model"

let app = express()
//connect to MongoDB
ConnectDB()

app.get("/test-database",async (req, res) => {
    try {
        let item = {
            userId: "12322",
            contactId: "123455"
        }
        let contact = await ContactModel.createNew(item)
        res.send(contact)
    } catch (error) {
        console.log(error)
    }
    res.send("<h1>hello world !!</h1>")
})

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
    console.log(`server running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})
