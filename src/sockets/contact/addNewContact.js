/**
 * @param io from socket.jo library
 */
let addnewContact = (io) => {
    io.on("connection", (socket) => {
        socket.on("add-new-contact", (data) => {
            console.log(data)
            console.log(socket.request.user)
        })
    })
}

module.exports = addnewContact
