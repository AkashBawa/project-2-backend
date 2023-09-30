
import {Schema, Model, model} from 'mongoose';

const UserSchema = new Schema( {
    userName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['volunteer', 'elder'],
        required: true
    },
    name: {
        type: String,
        required: false,
      },
      age: {
        type: Number,
        required: false,
      },
      profilePhoto: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false,
      },
      aboutMe: {
        type: String,
        required: false,
      },
      interest: {
        type: String,
        required: false,
      },
      contactNumber: {
        type: Number,
        required: false,
      },
      emergencyContact: {
        type: String,
        required: false,
      },
      
  
}, {
    timestamps: true
})

const userSchema = model('user', UserSchema);

export default  userSchema;