import UsersModel from "../models/user.js"
// import ElderModel from '../models/elderly.js';
import { mongoose } from "mongoose";


export default {
  updateUserProfile: async (req, res, next) => {
    try {
      const { name, age, gender, contactNumber, interest, emergencyContact, profilePhoto } = req.body;
      console.log("Received form data:", {
        name,
        age,
        gender,
        contactNumber,
        interest,
        emergencyContact,
        profilePhoto
      });

      const user = await UsersModel.findByIdAndUpdate(req.user.id, { name, age, gender, contactNumber,interest, emergencyContact, profilePhoto});
      return res.json({
        message: "Profile updated successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  getUserProfile:  async (req, res, next) => {
    try{
        const user = await UsersModel.findById(req.user.id)
        return res.json(user)
    }
    catch(err) {
        next(err)
    }
   
  },



};


