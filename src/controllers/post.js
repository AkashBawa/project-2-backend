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

        let query = {
            status: "PENDING"
        }
        
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
        const posts = await postModel.find(query).populate('userId');
        return res.json({
            success: true,
            posts
        })

    } catch (err) {
        next (err);
    }
}

const fetchPostByUser = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const posts = await postModel.find({userId}).populate('invitations.user');
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
};

const sendInvitation = async (req, res, next) => {
    try {

        const postId = req.body.postId;
        const userId = req.user.id;

        const fetchPost = await postModel.findById(postId);
        let invitations = fetchPost.toObject().invitations;

        if(!invitations || invitations.length == 0) {
            invitations = [ { user: userId, status: "PENDING"} ];    
        } else {
            const index = invitations.map((invite) => invite.user.toString()).indexOf(userId);
            if(index > -1) {
                throw new Error("User already has an invite");
            } else {
                invitations.push( { user: userId, status: "PENDING"})
            }
        }
        
        fetchPost.invitations = invitations;

        const updatePost = await fetchPost.save();

        return res.json({
            success: true,
            message: "Invitation send successfully",
            updatePost
        })

    } catch (err) {
        next(err);
    }
}

const deletePost = async (req, res, next) => {
    try {

    } catch (err) {
        next (err);
    }
}

const invitationResponse = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const { postId, acceptedUserId, status } = req.body;

        if( !(status == "REJECTED" || status == "ACCEPTED")) {
            throw new Error("Invalid status");
        }

        const currentPost = await postModel.findById(postId);
        
        if(currentPost.status === "BOOKED" ) {
            throw new Error("Booked Already")
        }
        const objectVersion = currentPost.toObject();

        let index = -1;

        for( let i = 0; i < objectVersion.invitations.length; i++) {
            const invite = objectVersion.invitations[i];
            if(invite.user.toString() == acceptedUserId ) {
                index = i;
                break;
            }
        }

        if(index == -1 ) {
            throw new Error("No user found")
        };

        currentPost.invitations[index].status = status;

        if(status == "ACCEPTED") {
            currentPost.status = "BOOKED"
        };
        await currentPost.save();
        return res.json({
            success: true,
            message: "Status updated",

        })
        

    } catch (err) {
        next(err)
    }
}

const fetchPostByVolunteer = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const postDetails = await postModel.find({"invitations.user" : userId});

        return res.json({
            success: true,
            data: postDetails
        });

    } catch (err) {
        next(err)
    }
}

export default {
    fetchPost,
    addPost,
    editPost,
    deletePost,
    sendInvitation,
    fetchPostByUser,
    invitationResponse,
    fetchPostByVolunteer
}