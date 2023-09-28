import express from 'express';
import UserController from "./../controllers/auth.js";
import  JWtService from "./../services/jsonWebToken.js";
import PostController from "./../controllers/post.js";

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

router.get("/postList", JWtService.validateToken);
router.post("/fetchPost", JWtService.validateToken, PostController.fetchPost);
router.post("/addpost", JWtService.validateToken, PostController.addPost)

export default router;