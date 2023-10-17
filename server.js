const express = require('express')
const app = express()
const connect = require('./db/database')
const cors = require('cors')
const router = require('./routes/routes')
require('dotenv').config()


const port = process.env.PORT || 3007

app.use(express.json())
app.use(cors())

app.use('/',router)


async function start(){
 try{
 	await connect()
 	app.listen(port,()=>{
 		console.log(`server is listening on port ${port}`)
 	})
 }
 catch(e){
 	console.log('connection error due to',e.message)
 }
}
start()