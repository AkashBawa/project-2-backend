import UsersModel from './../models/user.js';
import byScruptService from "./../services/bycrypt.js";


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
            await byScruptService.comparePassword(password, userData.password)
            return res.json({
                success: true,
                message: "Password match"
            })
        } catch (err) {
            next(err)
        }
    }
}