import { Router } from "express";
import movieServices from '../services/movieServices.js';
import artistService from '../services/artistService.js';
import artist from '../repositories/artistRepository.js';
import { isAuth } from "../middlewares/authMiddlewares.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const searchQuery = req.query;
    const movies = await movieServices.search(searchQuery);
    res.render('movies/search', {
        movies,
        filter: searchQuery
    });
});

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    await movieServices.create(newMovie);
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieServices.getById(movieId);
        res.render('movies/details', { movie, pageTitle: 'Movie Details', ratingStars });
    } catch (err) {
        res.status(404).render('404', { title: 'Page Not Found' });
    }
});
movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.getById(movieId);
    const artists = await artistService.getAll();
    res.render('movies/attach', { pageTitle: 'Attach Movie', movie, artists });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieServices.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`)
});
export default movieController;