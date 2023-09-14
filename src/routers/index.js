import express from 'express';
import UserController from "./../controllers/auth.js";


const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

export default router;