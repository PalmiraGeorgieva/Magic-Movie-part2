import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register'); 
});
authController.post('/register', async(req, res) => {
    const { email, password, repeatPassword } = req.body;
    await authService.register({ email, password, repeatPassword });
    res.redirect('/');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});
authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await authService.login(email, password);
        res.redirect('/');
    } catch (error) {
        res.status(401).render('auth/login', {
            error: error.message,
            email,
        });
    }
});
export default authController;
