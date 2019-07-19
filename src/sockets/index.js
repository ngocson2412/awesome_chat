import addNewContact from "./contact/addNewContact"
import removeRequestContactSent from "./contact/removeRequestContactSent"
/**
 * @param io from socket.jo library
 */
let initSockets = (io) => {
    addNewContact(io)
    removeRequestContactSent(io)
}

module.exports = initSockets
