import {pushSocketIdtoArray, emitNotifyArray, removeSoketIdFromArray} from "../../helpers/socketHelper"
/**
 * @param io from socket.jo library
 */
let removeRequestContactReceived = (io) => {
    let clients = {}
    io.on("connection", (socket) => {
        //push socket id to array
        let currentUserId = socket.request.user._id
        clients = pushSocketIdtoArray(clients, currentUserId, socket.id)

        socket.on("remove-request-contact-received", (data) => {
            let currentUser = {
                id: socket.request.user._id
            }
            if(clients[data.contactId]) {
                emitNotifyArray(clients, data.contactId, io, "response-remove-request-contact-received", currentUser)           
            }
        })

        socket.on("disconnect", () => {
            clients = removeSoketIdFromArray(clients, currentUserId, socket)
        })
    })
}

module.exports = removeRequestContactReceived
