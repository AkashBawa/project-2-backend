import UsersModel from "../models/user.js"
import postModel from './../models/post.js'
import mongoose from "mongoose";


export default {

    updateUserVolenteerProfile: async (req, res, next) => {
        try {
          const { name, age, gender, contactNumber, interest, profilePhoto } = req.body;
    
          const user = await UsersModel.findByIdAndUpdate(req.user.id, { name, age, gender, contactNumber,interest,});
          return res.json({
            message: "Profile added successfully",
          });
        } catch (err) {
          next(err);
        }
      },


      getVolProfile: async (req,res) => {
          try {
            const user = await UsersModel.findById(req.user.id)
            return res.json(user)
          } catch (err) {
            console.log(err)
          }
      },

      getRating: async (req,res) => {
        try {
          const userId = new mongoose.Types.ObjectId(req.user.id);
          const rating = await postModel.aggregate([
              {
                  $match: {
                    acceptedVolunteerId: userId,
                  },
              },
              {
                  $group: {
                    _id: null,
                    ratingAvg: {
                      $avg: "$rating"
                    }
                  }
              }
          ]).exec()

          res.json(rating)
        } catch (err) {
          console.log(err)
        }
    },

    getReview: async (req,res) => {
      try {
        const review = await postModel.findOne({ review: { $ne: null } });
      res.json(review);
      } catch (error) {
        console.log(error)
      }
      
    } 


      
    

}