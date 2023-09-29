import UsersModel from './../models/user.js';
import byScruptService from "./../services/bycrypt.js";
import jwtService from "./../services/jsonWebToken.js";


export default {
    signup: async (req, res, next) => {

        try {
            
            const { email, password, role, userName } = req.body;
            const hash = await byScruptService.generateHash(password);
            const newUser = await new UsersModel({email, password: hash, role, userName}).save();
            return res.json({
                message : "Signup success",
                user : newUser
            })
        } catch (err) {
            next(err)
        }
    },

    login: async (req, res, next) => {
        try {

            const { email, password } = req.body;

            const userData = await UsersModel.findOne({email});
            console.log(userData);
            await byScruptService.comparePassword(password, userData.password);

            const generateToken = await jwtService.generateToken( {userId: userData._id} );

            return res.json({
                success: true,
                message: "Password match",
                token : generateToken
            })
        } catch (err) {
            next(err)
        }
    },
    addElderProfile: async (req, res, next) => {
      try {
        const { name, lName, age, gender, contactNumber, interest, eContact } =
          req.body;
        console.log("Received form data:", {
          name,
          lName,
          age,
          gender,
          contactNumber,
          interest,
          eContact,
        });
  
        return res.json({
          message: "Profile added successfully",
        });
      } catch (err) {
        next(err);
      }
    },
}