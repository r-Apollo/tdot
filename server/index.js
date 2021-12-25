import express from "express"
import https from "https"
import fs from "fs"
import path from "path"
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

const sslServer = https.createServer({
    key: fs.readFileSync(path.resolve("./cert/key.pem")),
    cert: fs.readFileSync(path.resolve("./cert/cert.pem"))
}, app)

sslServer.listen(PORT, () => {
    console.log(`Api is running on https://localhost:${PORT}.`)
})
