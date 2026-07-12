import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routs.js';

const app = express();

app.engine('hbs', engine({
    extname: 'hbs',
    layoutsDir: './src/views/layout',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/static'));
app.use(routes);

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));