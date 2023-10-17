const {getprivatemodel,loginregistermodel} = require('../models/models')
const jwt = require('jsonwebtoken')

const privateemp = async(req,res)=>{
	try{
		const header = req.headers.authorization
		if(!header.startsWith("Bearer ")){
			return res.status.json("Invalid formate")
		}
		const token = header.split(" ")[1]
		const {email} = await jwt.verify(token,process.env.SECRETKEY)
		const user = await loginregistermodel.findOne({email:email})
		const data = await getprivatemodel.find({email:email})
		if(data.length === 0){
			return res.status(402).json({message:"data is not created"})
		}
		res.status(200).json(data)
	}catch(e){
		if(e.message === "Cannot read properties of undefined (reading 'startsWith')"){
			return res.status(401).json({error:"please provide token"})
		}
		res.status(401).json({error:e.message})
	}
}

const createprivateemp = async(req,res)=>{
	// const auth = req.headers
	// res.send(auth)
	try{
		const header = req.headers.authorization
		if(!header.startsWith("Bearer ")){
			return res.status.json("Invalid formate")
		}
		const token = header.split(" ")[1]
		const {email} = await jwt.verify(token,process.env.SECRETKEY)
		const user = await loginregistermodel.findOne({email:email})
		if(user){
			const data = await getprivatemodel.create({email:email,salary:req.body.salary})
			if(!data){
				return res.status(402).json({message:"data is not created"})
			}
			return res.status(200).json(data)
		}
		res.status(401).json({message:"Token is not valid!"})
	}catch(e){
		res.status(401).json({error:e.message})
	}
}

module.exports = {privateemp,createprivateemp}
