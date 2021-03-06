import {pushSocketIdtoArray, emitNotifyArray, removeSoketIdFromArray} from "./../../helpers/socketHelper"
/**
 * @param io from socket.jo library
 */
let approveRequestContactReceived = (io) => {
    let clients = {}
    io.on("connection", (socket) => {
        //push socket id to array
        let currentUserId = socket.request.user._id
        clients = pushSocketIdtoArray(clients, currentUserId, socket.id)

        socket.on("approve-request-contact-received", (data) => {
            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
                address: (socket.request.user.address !== null)? socket.request.user.address : "",
            }
            //emit notification
            if(clients[data.contactId]) {
                emitNotifyArray(clients, data.contactId, io, "response-approve-request-contact-received", currentUser)           
            }
        })

        socket.on("disconnect", () => {
            clients = removeSoketIdFromArray(clients, currentUserId, socket)
        })
    })
}

module.exports = approveRequestContactReceived
