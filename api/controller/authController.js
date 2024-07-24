import User from '../model/userModel.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req,res,next)=>{
    try{
        const { username ,email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password,10)
        const newUser = await User.create({username , email , password : hashedPassword})
        res.status(201).json({message: "User Created successfully"}) 
    } catch (error) {
        next(error);
    }
}