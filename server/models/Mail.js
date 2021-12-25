import mongoose from "mongoose"

const MailSchema = new mongoose.Schema({
    accepted: {
        type: Array,
        required: true,
    },
    rejected: {
        type: Array,
        required: true,
    },
    envelopeTime: {
        type: Number,
        required: true
    },
    messageTime: {
        type: Number,
        required: true
    },
    messageSize: {
        type: Number,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    envelope: {
        type: Object,
        required: true
    },
    messageId: {
        type: String,
        required: true
    }
})

const MailModel = mongoose.model("emails", MailSchema)

export default MailModel
