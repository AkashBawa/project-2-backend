import express from 'express';
import UserController from "./../controllers/auth.js";
import  JWtService from "./../services/jsonWebToken.js";
import PostController from "./../controllers/post.js";
import ElderController from "./../controllers/elder.js"
import volenteerController from '../controllers/volenteer.js';
import EventsController from "./../controllers/events.js"

const router = express.Router();

// Define the route for deleting a post


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get("/postList", JWtService.validateToken);
router.get("/user", JWtService.validateToken, ElderController.getUserProfile);

// Elder routes
router.post("/updateProfile", JWtService.validateToken, ElderController.updateUserProfile);
router.post("/fetchPost", JWtService.validateToken, PostController.fetchPost);
router.post("/addpost", JWtService.validateToken, PostController.addPost);
router.put("/sendInvitation", JWtService.validateToken, PostController.sendInvitation);
router.post("/updateRating", JWtService.validateToken, PostController.updateRating)
router.delete("/deletePost/:postId", JWtService.validateToken, PostController.deletePost);
// module.exports = router;

// volenteer Route
router.post("/updateProfileVol", JWtService.validateToken, volenteerController.updateUserVolenteerProfile);
router.get("/getPostByUser", JWtService.validateToken, PostController.fetchPostByUser);
router.put('/responseInvitation', JWtService.validateToken, PostController.invitationResponse);
router.post("/createEvent", JWtService.validateToken, EventsController.createEvents);
router.get("/volunteerPosts", JWtService.validateToken, PostController.fetchPostByVolunteer);
router.get("/averageRating", JWtService.validateToken, volenteerController.getRating);
router.get("/getReview", JWtService.validateToken, volenteerController.getReview);
router.get("/postByVolunteer", JWtService.validateToken, PostController.getVolunteerPost);

// events
router.get("/eventList", JWtService.validateToken, EventsController.fetchEvents);
router.post("/joinEvent", JWtService.validateToken, EventsController.joinEvent);
router.get("/fetchMyEvents", JWtService.validateToken, EventsController.fetchAllJoinedEvents);



export default router;