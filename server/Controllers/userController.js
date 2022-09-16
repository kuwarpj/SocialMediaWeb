import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// Get a User

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No Such User");
    }
  } catch (error) {
    res.status(500);
  }
};

//Update User

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const {_id, currentUserAdmin, password } = req.body;

  if (id === _id ) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        {username: user.username, id: user._id},
        process.env.JWT_KEY, {expiresIn: '1h'}
      )
      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json(error);
    }
   
  }
  else{
    res.status(403).json("You Cannot Edit Other profile")
}
};


//Delete User 

export const deleteUser = async (req, res)=>{
    const id = req.params.id;

    const{currentUserId, currentUserAdmin} = req.body;
    if(currentUserId === id || currentUserAdmin){
        try {

             await UserModel.findByIdAndDelete(id )
            res.status(200).json("User Deleted")
            
        } catch (error) {
            res.status(404).json("You can oly delete own Profile")
        }
    }
}

// Follow a User 


export const followUser = async (req, res)=>{
    const id = req.params.id;

    const{ _id} = req.body;

    if(_id === id){
        res.status(403).json("You Cannot follow Yourself");
    }else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push : {followers: _id}})
                await followingUser.updateOne({$push : {following: id}})
               res.status(200).json("User Followed")
            }else{
                res.status(404).json("User is Already Followed By You")

            }
        } catch (error) {
            res.status(404).json("Error Occured")
        }
    }
}

//UnFollow a User

export const unfollowUser = async (req, res)=>{
    const id = req.params.id;

    const{ _id} = req.body;

    if(_id === id){
        res.status(403).json("You Cannot unfollow Yourself");
    }else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)

            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull : {followers: _id}})
                await followingUser.updateOne({$pull : {following: id}})
               res.status(200).json("User Un-Followed")
            }else{
                res.status(404).json("User is Not Followed By You")

            }
        } catch (error) {
            res.status(404).json("Error Occcured")
        }
    }
}

export const getAllUser = async(req, res)=>{
  try {
    let users = await UserModel.find()
    users = users.map((user)=>{
const {password, ...otherDetails} = user._doc
return otherDetails
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}