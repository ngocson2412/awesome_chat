import addNewContact from "./contact/addNewContact"
import removeRequestContact from "./contact/removeRequestContact"
/**
 * @param io from socket.jo library
 */
let initSockets = (io) => {
    addNewContact(io)
    removeRequestContact(io)
}

module.exports = initSockets
