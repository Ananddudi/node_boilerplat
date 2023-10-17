

const {loginregistermodel} = require("../models/models")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async(req,res)=>{
try{
	const {email,password} = req.body

	if(!email || !password){
		return res.status(401).json({message:"please provide non empty fields"})
	}
	const user = await loginregistermodel.findOne({email:email})
	if(!user){
		return res.status(402).json({message:"user is not valid one"})
	}
	const isPasswordCorrect = await bcrypt.compare(password,user.password)
	if(isPasswordCorrect){
		const token = jwt.sign({email:email},process.env.SECRETKEY)
		const data = await loginregistermodel.findOneAndUpdate(user,{$set:{name:user.name,email:user.email,password:user.password,token:token}},{new:true})
		return res.status(401).json(data)
	}
	res.status(201).json({message:"password did not match"})
}
catch(e){
	res.status(501).json({error:e.message})
}

	
}

module.exports = login