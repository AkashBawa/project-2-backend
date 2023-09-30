import UsersModel from "../models/user.js"



export default {

    updateUserVolenteerProfile: async (req, res, next) => {
        try {
          const { name, age, gender, contactNumber, interest } = req.body;
          console.log("Received form data:", {
            name,
            age,
            gender,
            contactNumber,
            interest,

          });
    
          const user = await UsersModel.findByIdAndUpdate(req.user.id, { name, age, gender, contactNumber,interest,});
          return res.json({
            message: "Profile added successfully",
          });
        } catch (err) {
          next(err);
        }
      },
    

}