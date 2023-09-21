import express from 'express';
import UserController from "./../controllers/auth.js";
import  JWtService from "./../services/jsonWebToken.js";
const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

router.get("/postList", JWtService.validateToken)

export default router;