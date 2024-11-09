const express = require("express")
const http = require("http")
const cors = require("cors")
const app = express()

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}


app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require("./app/routes/Usuario.routes.js")(app);
require("./app/routes/Auto.routes.js")(app);
require("./app/routes/Reserva.routes.js")(app);

app.get('/', (req,res)=> {
    res.send("hola mundo perra inmunda")
})

let PORT = process.env.PORT
http.createServer(app).listen(PORT,()=> {
    console.log("Servidor coriendo puerto: " + PORT)
})