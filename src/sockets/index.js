import addNewContact from "./contact/addNewContact"
import removeContact from "./contact/removeContact"
import removeRequestContactSent from "./contact/removeRequestContactSent"
import removeRequestContactReceived from "./contact/removeRequestContactReceived"
import approveRequestContactReceived from "./contact/approveRequestContactReceived"

/**
 * @param io from socket.jo library
 */
let initSockets = (io) => {
    addNewContact(io)
    removeContact(io)
    removeRequestContactSent(io)
    removeRequestContactReceived(io)
    approveRequestContactReceived(io)
}

module.exports = initSockets
