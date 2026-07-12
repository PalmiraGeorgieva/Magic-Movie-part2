import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
export async function readDB(collection) {
  const content = await fs.readFile('./src/db.json', { encoding: 'utf-8'});
  const db = JSON.parse(content);

  if (collection && !db.hasOwnProperty(collection)) {
    throw new Error(`Collection '${collection}' not found`);
  }
  return collection ? db[collection] : db;
} 

async function writeDB(db) {
  const content = JSON.stringify(db, null, 2);
  await fs.writeFile('./src/db.json', content);
}

async function getAll(filter = {}) {
    const movies = await readDB('movies');
    return movies;
}    

async function create(movieData) {
    movieData.id = uuid();
    if (movieData.image && !movieData.imageUrl) {
        movieData.imageUrl = movieData.image;
    }
    const db = await readDB();
    db.movies.push(movieData);
    await writeDB(db);
}
async function getById(movieId) {
    const movies = await readDB('movies');
    const movie = movies.find(m => m.id === movieId);
    if(!movie) {
      throw new Error(`Movie with ID '${movieId}' not found`);
    }
    return movie;
}

async function search(searchParams = {}) {
    const movies = await readDB('movies');
    const { search = '', genre = '', year = '' } = searchParams;

    return movies.filter(movie => {
        const matchesSearch = !search || movie.title.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = !genre || movie.genre.toLowerCase().includes(genre.toLowerCase());
        const matchesYear = !year || String(movie.year) === String(year);

        return matchesSearch && matchesGenre && matchesYear;
    });
}

const movieRepository = {
    getAll,
    create,
    getById,
    search
};

export default movieRepository;