const express  = require ("express")
const app = express()
app.use(express.urlencoded({extended:true, limit:"5mb"}))
app.use(express.json())
const cors = require("cors")
app.use(cors())
require("dotenv").config()
const mongoose = require("mongoose");
let PORT = process.env.PORT

const router = require("./routes/user.routes")
app.use("/user", router);

app.listen(PORT,()=>{
    console.log("App is running at port:" + PORT)
})
const MONGO_URL= "mongodb+srv://okiki18:jafar18lawal@cluster0.imbs2lh.mongodb.net/school_portal_db?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Mongo Connected successfully")
}).catch((err)=>{
    console.log("there was a problem connecting"+err)
    console.log(err)
})

