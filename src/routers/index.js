import express from 'express';
import UserController from "./../controllers/auth.js";
import  JWtService from "./../services/jsonWebToken.js";
import PostController from "./../controllers/post.js";
import ElderController from "./../controllers/elder.js"
import volenteerController from '../controllers/volenteer.js';


const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get("/postList", JWtService.validateToken);
router.get("/user", JWtService.validateToken, ElderController.getUserProfile);

// Elder routes
router.post("/updateProfile", JWtService.validateToken, ElderController.updateUserProfile);
router.post("/fetchPost", JWtService.validateToken, PostController.fetchPost);
router.post("/addpost", JWtService.validateToken, PostController.addPost);

// volenteer Route
router.post("/updateProfileVol", JWtService.validateToken, volenteerController.updateUserVolenteerProfile);


// Volunteer routes

export default router;