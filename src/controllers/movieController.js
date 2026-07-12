import { Router } from "express";
import movieServices from '../services/movieServices.js';

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const searchQuery = req.query;
    const movies = await movieServices.search(searchQuery);
    res.render('movies/search', {
        movies,
        filter: searchQuery
    });
});

movieController.get('/create', (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    await movieServices.create(newMovie);
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieServices.getById(movieId);
        res.render('movies/details', { movie });
    } catch (err) {
        res.status(404).render('404', { title: 'Page Not Found' });
    }
});

export default movieController;