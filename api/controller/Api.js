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
    const persons = await PersonModel.find({})

    const early = Array.from(persons).filter(person => {if (person.time == "11:00-12:00") {return person}})
    const late = Array.from(persons).filter(person => {if (person.time == "13:00-14:00") {return person}})

    let earlyAmmount = 0
    let lateAmmount = 0

    early.forEach(person => earlyAmmount += person.dependants)
    late.forEach(person => lateAmmount += person.dependants)

    const response = {
        timeslots: {
            "11:00-12:00": earlyAmmount,
            "13:00-14:00": lateAmmount
        },
    }
    res.status(200).send(response)
}

//Post requests
export const addPerson = async(req, res) => {
    const Person = new PersonModel(req.body)
    await Person.save()
    res.status(201).send(Person)
}
