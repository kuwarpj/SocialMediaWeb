import express from 'express'
import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
   
    {
       
        username:{
            type:String,
            required:true
        },

        password:{
            type:String,
            required:true
        },

        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },

        isAdmin:{
            type: Boolean,
            default: false
        },
        profilePic : String,
        coverPic: String,
        about: String,
        livesin : String,
        workAt : String,
        relationship : String,

        followers : [],
        following : [],

       
    },
    {
        timestamps : true
    },
    
)

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel