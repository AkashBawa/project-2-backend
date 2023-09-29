// add , update, fetch and delete post
import Joi from 'joi';
import JoiServices from '../services/JoiServices.js';
import postModel from "./../models/post.js";

const PostJoi = Joi.object({
    date: Joi.string().required(),
    time: Joi.string().required(),
    serviceTitle: Joi.string().required(),
    location: Joi.object({
        coordinates: Joi.array().max(2)
    }),
    serviceType: Joi.string().required()
    
})

const addPost = async (req, res, next) => {
    try {
        console.log(req.body)
        const userId = req.user.id;
        const role = req.user.role;

        if(role == "volunteer") {
            throw new Error("Access denied");
        }

        const joiResponse = await JoiServices.validateBodyAsync(PostJoi, req.body);
        const newPost = await new postModel({userId, ...req.body}).save();

        return res.json({
            success: true,
            post: newPost
        }).status(201)

    } catch (err) {
        next (err);
    }
}

const fetchPost = async (req, res, next) => {
    try {

        const coordiates = req.body.location;
        const maxDistace = req.body.maxDistace ? req.body.maxDistace : 5000;

        let query = {};
        
        if(coordiates) {
            query.location = {
                $near: {
                    "$geometry" : {
                        type: "Point",
                        coordinates: coordiates
                    },
                    "$maxDistance" : maxDistace
                }
            }
        }
        const posts = await postModel.find(query);
        return res.json({
            success: true,
            posts
        })

    } catch (err) {
        next (err);
    }
}

const editPost = async (req, res, next) => {
    try {

    } catch (err) {
        next (err);
    }
}


const deletePost = async (req, res, next) => {
    try {

    } catch (err) {
        next (err);
    }
}

export default {
    fetchPost,
    addPost,
    editPost,
    deletePost
}