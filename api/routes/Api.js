import express from "express"
import { addPerson, getAllPersons, getTimeslotsInfo } from "../controller/Api.js"
import { handleEmail, validateRegister } from "../middleware/Api.js"

const router = express.Router()

//Get requests
router.get("/persons", getAllPersons)

router.get("/timeslots", getTimeslotsInfo)


//Post requests
router.post("/person", validateRegister, handleEmail, addPerson)

export default router
