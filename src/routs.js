import { Router } from 'express';
import homeController from './controllers/homeControllers.js';
import movieController from './controllers/movieController.js';
import artistController from './controllers/artistsController.js';

const routes = Router();

routes.use('/', homeController);
routes.use('/movies', movieController);
routes.use('/artists', artistController);
routes.get('*url', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});
export default routes;