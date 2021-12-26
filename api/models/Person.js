import mongoose from "mongoose"

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    eMail: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    dependants: {
        type: Number,
        required: true
    }
})

const PersonModel = mongoose.model("persons", PersonSchema)

export default PersonModel
