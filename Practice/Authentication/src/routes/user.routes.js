import { Router} from "express"
import { register, verifyEmail, login, forgetPassword, resetPassword, googleSuccess} from "../controllers/user.controller.js";
import { authenticate, authorize} from "../middleware/auth.middleware.js";
import passport from "passport";

const router = Router();

router.post('/register', register)
router.get('/verify', verifyEmail)
router.post('/login', login)
router.post('/forgot-password', forgetPassword)
router.post('/reset-password', resetPassword)

router.get('/protected', authenticate, async(req, res) => {
    res.json({ message: 'This is a protected route' });
})

router.get('/only-admin', authenticate, authorize("admin"), async(req, res) => {
        return res.status(403).json({ message: 'only admin can access this route' });
    });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    googleSuccess
}));
export default router;