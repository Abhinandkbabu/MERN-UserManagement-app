import User from '../model/userModel.js'

export const adminSignin = async (req,res)=>{
    const {email, password} = req.body 
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if(email==adminEmail&&password==adminPassword){
        res.status(200).json({success:true,adminEmail})
    }else{
        res.status(401).json({success:false})
    }
}

export const getUser = async (req,res)=>{
    try{
        const user = await User.find({})
        if(user) res.status(200).json(user)
    }catch(error){
        res.status(500).json('server error')
    }
}

export const updateStatus = async(req,res,next)=>{
    try {
        const id = req.params.id
    const status = req.body.action
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { status: status }, 
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        next(error)
    }
    
}