import { Router} from "express"
import { register, verifyEmail, login, forgetPassword, resetPassword} from "../controllers/user.controller.js";

const router = Router();
router.post('/register', register)
router.get('/verify', verifyEmail)
router.post('/login', login)
router.post('/forgot-password', forgetPassword)
router.post('/reset-password', resetPassword)
export default router;