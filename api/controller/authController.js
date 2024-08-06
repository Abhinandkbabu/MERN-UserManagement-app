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

        if(validUser==null) { return next(errorHandler(404, 'Invalid Email Address or Password')) }
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

export const google = async(req,res,next) => {
    try {
                
        const newuser = await User.findOne({email:req.body.email})
        if(newuser){
            const token = jwt.sign({id:newuser._id}, process.env.JWT_SECRET);
            const { password: _, ...user } = newuser._doc;
            const expiryDate = new Date(Date.now() + 7200000) //two hours
            res.cookie('access_token', token, {httpOnly: true, expires:expiryDate}).status(200).json(user)
        }else{
            const generatedPassword = `${req.body.email}1234`;
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = await User.create({username:req.body.name.split(" ").join('').toLowerCase() , email:req.body.email , password : hashedPassword, profilePicture: req.body.photo}) 
            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
            const expiryDate = new Date(Date.now() + 7200000) //two hours
            const { password: _, ...user } = newUser._doc
            res.cookie('access_token',token, {httpOnly:true,expires:expiryDate}).status(200).json(user)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const signout = (req,res)=>{
    res.clearCookie('access_token').status(200).json('signout Success')
}