// add , update, fetch and delete post
import Joi from 'joi';
import JoiServices from '../services/JoiServices.js';
import postModel from "./../models/post.js";
import userModel from '../models/user.js';


const PostJoi = Joi.object({
    date: Joi.string().required(),
    time: Joi.string().required(),
    // startTime: Joi.string().optional,
    endTime: Joi.string().optional(),
    serviceTitle: Joi.string().required(),
    address: Joi.string().required(),
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

        if (role == "volunteer") {
            throw new Error("Access denied");
        }

        const joiResponse = await JoiServices.validateBodyAsync(PostJoi, req.body);
        const newPost = await new postModel({ userId, ...req.body }).save();

        return res.json({
            success: true,
            post: newPost
        }).status(201)

    } catch (err) {
        next(err);
    }
}

const fetchPost = async (req, res, next) => {
    try {

        const coordiates = req.body.location;
        const maxDistace = req.body.maxDistace ? req.body.maxDistace : 5000;

        let query = {
            status: "PENDING"
        }

        if (coordiates) {
            query.location = {
                $near: {
                    "$geometry": {
                        type: "Point",
                        coordinates: coordiates
                    },
                    "$maxDistance": maxDistace
                }
            }
        }
        const posts = await postModel.find(query).populate('userId');
        return res.json({
            success: true,
            posts
        })

    } catch (err) {
        next(err);
    }
}

const fetchPostByUser = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const posts = await postModel.find({ userId }).populate('invitations.user');
        return res.json({
            success: true,
            posts
        })

    } catch (err) {
        next(err);
    }
}

const editPost = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
};

const sendInvitation = async (req, res, next) => {
    try {

        const postId = req.body.postId;
        const userId = req.user.id;

        const fetchPost = await postModel.findById(postId);
        let invitations = fetchPost.toObject().invitations;

        if (!invitations || invitations.length == 0) {
            invitations = [{ user: userId, status: "PENDING" }];
        } else {
            const index = invitations.map((invite) => invite.user.toString()).indexOf(userId);
            if (index > -1) {
                throw new Error("User already has an invite");
            } else {
                invitations.push({ user: userId, status: "PENDING" })
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
        console.log("Delete Post Request:", req);
        const postId = req.params.postId;
        console.log("Deleting post with ID:", postId);

        // Check if the post with the given postId exists
        const postToDelete = await postModel.findById(postId);
        if (!postToDelete) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check if the user making the request is the owner of the post (userId should match the requester's userId)
        const userId = req.user.id;
        if (postToDelete.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this post",
            });
        }

        // Perform the deletion
        await postModel.findByIdAndDelete(postId);

        return res.json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

const getVolunteerPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const posts = await postModel.find({ acceptedVolunteerId: userId });
        return res.json({
            success: true,
            posts
        })
    } catch (err) {
        next(err)
    }
}



// const deletePost = async (req, res, next) => {
//     try {

//     } catch (err) {
//         next (err);
//     }
// }

const invitationResponse = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const { postId, acceptedUserId, status } = req.body;

        if (!(status == "REJECTED" || status == "ACCEPTED")) {
            throw new Error("Invalid status");
        }

        const currentPost = await postModel.findById(postId);

        if (currentPost.status === "BOOKED") {
            throw new Error("Booked Already")
        }
        const objectVersion = currentPost.toObject();

        let index = -1;

        for (let i = 0; i < objectVersion.invitations.length; i++) {
            const invite = objectVersion.invitations[i];
            if (invite.user.toString() == acceptedUserId) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            throw new Error("No user found")
        };

        currentPost.invitations[index].status = status;

        if (status == "ACCEPTED") {
            currentPost.status = "BOOKED"
            currentPost.acceptedVolunteerId = acceptedUserId;
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
        const postDetails = await postModel.find({status: { $ne : "PENDING" }  ,"invitations.user": userId });

        return res.json({
            success: true,
            data: postDetails
        });

    } catch (err) {
        next(err)
    }
}


const updateRating = async (req, res, next) => {
    try {
        const { rating, review, id } = req.body;
        const status = "COMPLETED"
        await postModel.findByIdAndUpdate(id, { rating, review, status });
        const post = await postModel.findById(id)
        let point = rating * 10
        const user = await userModel.findById(post.acceptedVolunteerId)
        if (user.point) {
            user.point = point + user.point
        } else {
            user.point = point
        }

        await user.save()
        return res.json({
            success: true,
        })
    } catch (error) {
        next(error)
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
    fetchPostByVolunteer,
    updateRating,
    getVolunteerPost
}