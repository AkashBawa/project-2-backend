
import UsersModel from './../models/user.js';
import byScruptService from "./../services/bycrypt.js";
import jwtService from "./../services/jsonWebToken.js";




export default {
    signup: async (req, res, next) => {

        try {
            
            const { email, password, role, userName } = req.body;
            const hash = await byScruptService.generateHash(password);
            const newUser = await new UsersModel({email, password: hash, role, userName}).save();
            const generateToken = await jwtService.generateToken( {userId: newUser._id, role: newUser.role} );
            return res.json({
                success: true,
                message : "Signup success",
                user : newUser,
                role: newUser.role,
                token: generateToken
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

            const generateToken = await jwtService.generateToken( {userId: userData._id, role: userData.role} );

            return res.json({
                success: true,
                message: "Password match",
                token : generateToken,
                role: userData.role
            })
        } catch (err) {
            next(err)
        }
    },

    
  }