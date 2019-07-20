import mongoose from "mongoose"

let Schema = mongoose.Schema

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null},
})

ContactSchema.statics = {
    createNew(item) {
        return this.create(item)
    },
    /**
     * Find all item that related with user
     * @param {string} userId 
     */
    findAllByUer(userId) {
        return this.find({
            $or:[
                {"userId": userId},
                {"contactId": userId}
            ]
        }).exec()
    },
    /**
     * check exists of 2 user
     */
    checkExists(userId, contactId) {
        return this.findOne({
            $or: [
                {$and: [
                    {"userId": userId},
                    {"contactId": contactId}
                ]},
                {$and: [
                    {"userId": contactId},
                    {"contactId": userId}
                ]}
            ]
        }).exec()
    },
    /**
     * Remove request contact sent
     */
    removeRequestContactSent(userId, contactId) {
        return this.remove({
            $and: [
                {"userId": userId},
                {"contactId": contactId}
            ]
        }).exec()
    },
    /**
     * Remove request contact received
     */
    removeRequestContactReceived(userId, contactId) {
        return this.remove({
            $and: [
                {"userId": contactId},
                {"contactId": userId}
            ]
        }).exec()
    },
    /**
     * Get contacts by userId and limit
     */
    getContacts(userId, limit) {
        return this.find({
            $and: [
                {$or: [
                    {"userId": userId},
                    {"contactId": userId}
                ]},
                {"status": true}
            ]
        }).sort({"createdAt": -1}).limit(limit).exec()
    },
    /**
     * Get contacts sent by userId and limit
     */
    getContactsSent(userId, limit) {
        return this.find({
            $and: [
                {"userId": userId},
                {"status": false}
            ]
        }).sort({"createdAt": -1}).limit(limit).exec()
    },
    /**
     * Get contacts received by userId and limit
     */
    getContactsReceived(contactId, limit) {
        return this.find({
            $and: [
                {"contactId": contactId},
                {"status": false}
            ]
        }).sort({"createdAt": -1}).limit(limit).exec()
    },
    /**
     * count all contacts by userId and limit
     */
    countAllContacts(userId) {
        return this.count({
            $and: [
                {$or: [
                    {"userId": userId},
                    {"contactId": userId}
                ]},
                {"status": true}
            ]
        }).exec()
    },
    /**
     * count all contacts sent by userId and limit
     */
    countAllContactsSent(userId) {
        return this.count({
            $and: [
                {"userId": userId},
                {"status": false}
            ]
        }).exec()
    },
    /**
     * count all contacts received by userId and limit
     */
    countAllContactsReceived(contactId) {
        return this.count({
            $and: [
                {"contactId": contactId},
                {"status": false}
            ]
        }).exec()
    },
    /**
     * Read more Contact sent , max 10 items
     * @param {string} UserID 
     * @param {number} skip
     * @param {number} limit
     */
    readMoreContacts(userId, skip, limit) {
        return this.find({
            $and: [
                {$or: [
                    {"userId": userId},
                    {"contactId": userId}
                ]},
                {"status": true}
            ]
        }).sort({"createdAt": -1}).skip(skip).limit(limit).exec()
    },
    /**
     * Read more Contact sent , max 10 items
     * @param {string} UserID 
     * @param {number} skip
     * @param {number} limit
     */
    readMoreContactsSent(userId, skip, limit) {
        return this.find({
            $and: [
                {"userId": userId},
                {"status": false}
            ]
        }).sort({"createdAt": -1}).skip(skip).limit(limit).exec()
    },
    /**
     * Read more Contact Received , max 10 items
     * @param {string} UserID 
     * @param {number} skip
     * @param {number} limit
     */
    readMoreContactsReceived(userId, skip, limit) {
        return this.find({
            $and: [
                {"contactId": userId},
                {"status": false}
            ]
        }).sort({"createdAt": -1}).skip(skip).limit(limit).exec()
    }
}
module.exports = mongoose.model("contact", ContactSchema)
