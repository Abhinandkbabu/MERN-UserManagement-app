
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },

    email:{
        type:String,
        required: true,
        unique: true,
    },

    password:{
        type:String,
        required: true,
    },
    profilePicture:{
        type:String,
        default: "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
    },
    status: {
        type:String,
        default: 'active'
    }

},{timestamps :true})

const User = mongoose.model('User', userSchema)

export default User;