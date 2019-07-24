import mongoose from "mongoose"

let Schema = mongoose.Schema

let ChatGroupSchema = new Schema({
    name: String,
    userAmount: {type: Number, min: 3, max: 188},
    messageAmount: {type: Number, default: 0},
    userId: String,
    member: [
        {userId: String}
    ],
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null},
})
/**
 * get chat group items by userId and limit
 * @param {string}  userId
 * @param {Number}  limit
 */
ChatGroupSchema.statics = {
    getChatGroups(userId, limit) {
        return this.find({
            "member" : {$elemMatch: {"userId": userId}}
        }).sort({"createdAt": -1}).limit(limit).exec()
    }
}
module.exports = mongoose.model("chat-group", ChatGroupSchema)
