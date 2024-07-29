import User from '../model/userModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=>{
    try{
        const { username ,email, password, confirmPassword } = req.body;
        const hashedPassword = bcryptjs.hashSync(password,10)
        const newUser = await User.create({username , email , password : hashedPassword}) 
        res.status(201).json({message: "User Created successfully"}) 
    } catch (error) {
        console.log(error)
        next(error); 
    }
};

export const signin = async (req, res, next) => {
    try{
        const {email,  password} = req.body
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, 'Invalid Email Address or Password'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) next(errorHandler(401, 'Invalid Email Address or Password'))
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const { password: _, ...user } = validUser._doc;
        const expiryDate = new Date(Date.now() + 7200000) //two hours
        res.cookie('access_token', token, {httpOnly : true, expires: expiryDate}).status(200).json(user)
    }catch (err){
        next(err)
    }
}