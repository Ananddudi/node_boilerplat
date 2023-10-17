const {loginregistermodel} = require("../models/models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async(req,res)=>{
	try{
		const {email,password,name} = req.body


		const token = jwt.sign({email:email},process.env.SECRETKEY,{expiresIn:'3d'})

		if(!email || !password){
			return res.status(401).json({message:"fields should not be empty"})
		}

		const salt = await bcrypt.genSalt(10)
		const hashpassword = await bcrypt.hash(password,salt)

		const data = await loginregistermodel.create({name:name,email:email,password:hashpassword,token:token})
		res.status(200).json(data)

	}catch(e){
		res.status(401).json({error:e.message})
	}
	
}

module.exports = register