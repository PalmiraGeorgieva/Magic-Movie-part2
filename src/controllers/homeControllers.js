import { Router } from "express";
import movieServices from "../services/movieServices.js";

const homeController = Router();
homeController.get('/', async(req, res) => {
   const movies =  await movieServices.getAll();
   
    res.render('home', { movies });
});
homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;