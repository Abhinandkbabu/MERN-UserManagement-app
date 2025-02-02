import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import brcryptjs from 'bcryptjs'

export const test = (req,res)=>{
    res.json({msg:'api working'})
}

export const updateUser = async (req, res, next) => {
    
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can update only Your account'))
    }
    try {
        if(req.body.password){
            req.body.password = brcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            },
            {new: true}
        )
        
        const { password, ...user } = updateUser._doc;

        res.status(200).json(user);

    } catch (error) {
        next(error)
    }
}

export const  deleteUser = async (req,res,next) => {
    if(req.user.id!==req.params.id) return next(errorHandler(401,'You can delete only your account'))
    
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User Has been deleted')
    }catch(error){
        next(error)
    }
}