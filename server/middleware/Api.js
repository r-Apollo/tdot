import dotnet from "dotenv"
import emailValidator from "deep-email-validator"
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "node:path"
import PersonModel from "../models/Person.js";

dotnet.config()

export const validateRegister = async(req, res, next) => {
    //Checks for to many registered Persons
    const personCount = PersonModel.countDocuments({
        time: req.body.time,
        day: req.body.day
    })
    //Checks if new people can be registered.
    if(process.env.MAX_PERSONS - (personCount + req.body.dependants + 1) > 0) return res.status(406).json({message: "Zuviele Personen."})

    //Checks if eMail is already in use.
    const matchingMails = await PersonModel.find({eMail:req.body.eMail})
    if(matchingMails.length > 0) return res.status(406).json({message: "Diese eMail ist bereits registriert."})

    //Deep email validator
    const validation = await emailValidator.validate(req.body.eMail)
    if(!validation.valid) return res.status(400).json(validation.validators)

    next()
}

export const handleEmail = async(req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    //lets us use handlebars
    transporter.use("compile", hbs({
        viewEngine: {
            extname: ".handlebars",
            partialsDir: path.resolve("./views"),
            defaultLayout: false,
        },
        viewPath: path.resolve("./views")
    }))

    let mailOptions = {
        from: `"René Delion" ${process.env.EMAIL_USER}`,
        to: req.body.eMail,
        subject: "Testing",
        template: "registerEmail",
        context: {
            name: req.body.name,
        }
    }

    await transporter.sendMail(mailOptions, (err, data) => {
        if(err) {
            console.log(err)
        }
        else console.log("Email sent")
    })

    next()
}
