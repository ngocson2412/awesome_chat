import {pushSocketIdtoArray, emitNotifyArray, removeSoketIdFromArray} from "./../../helpers/socketHelper"
/**
 * @param io from socket.jo library
 */
let removeContact = (io) => {
    let clients = {}
    io.on("connection", (socket) => {
        //push socket id to array
        let currentUserId = socket.request.user._id
        clients = pushSocketIdtoArray(clients, currentUserId, socket.id)

        socket.on("remove-contact", (data) => {
            let currentUser = {
                id: socket.request.user._id
            }
            //emit notification
            if(clients[data.contactId]) {
                emitNotifyArray(clients, data.contactId, io, "response-remove-contact", currentUser)           
            }
        })

        socket.on("disconnect", () => {
            clients = removeSoketIdFromArray(clients, currentUserId, socket)
        })
    })
}

module.exports = removeContact
