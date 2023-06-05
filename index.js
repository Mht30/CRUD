//console.log('May Node be with you');
var PORT = process.env.port || 3000

const express = require("express")
const path = require('path')
const app = express()
const dotenv    = require('dotenv');
const mongoose  = require('mongoose');
dotenv.config();
// server Created
app.listen(PORT, function(error){
	if(error) throw error
	console.log("Server created Successfully on PORT: http://localhost:3000/", PORT)
})
// db Connection
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
).then(() => console.log("DB is connected successfully"));


// View Engine Setup
var usersRouter = require('./routes/dataroute');

app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('', usersRouter);

