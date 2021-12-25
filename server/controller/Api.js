import mongoose from "mongoose"
import dotenv from "dotenv"
import PersonModel from "../models/Person.js"

dotenv.config()

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})


//Get requests
export const getAllPersons = async (req, res) => {
    const persons = await PersonModel.find({});
    res.status(200).send(persons)
}

export const getTimeslotsInfo = async (req, res) => {
    const response = {
        dayOne: {
            "11:00-12:00": await PersonModel.countDocuments({time:"11:00-12:00", day:1}),
            "13:00-14:00": await PersonModel.countDocuments({time:"13:00-14:00", day:1})
        },
        dayTwo: {
            "11:00-12:00": await PersonModel.countDocuments({time:"11:00-12:00", day:2}),
            "13:00-14:00": await PersonModel.countDocuments({time:"13:00-14:00", day:2})
        }
    }
    res.status(200).send(response)
}

//Post requests
export const addPerson = async(req, res) => {
    const Person = new PersonModel({
        name: req.body.name,
        lastName: req.body.lastName,
        eMail: req.body.eMail,
        day: req.body.day,
        time: req.body.time,
        dependants: req.body.dependants
    })
    await Person.save()
    res.status(201).send(Person)
}
