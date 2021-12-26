import express from "express"
import cors from "cors"
import apiRoutes from "./routes/Api.js"

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

//Api routes
app.use("/api", apiRoutes)


//Generic 404
app.get("*", (req, res) => {
    res.status(404).send("This page does not exist.")
})

app.listen(PORT, () => {
    console.log(`Api running on http://localhost:${PORT}.`)
})
