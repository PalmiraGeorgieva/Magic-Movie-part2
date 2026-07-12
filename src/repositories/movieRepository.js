import fs from 'fs/promises';
import { prisma } from '../lib/prisma.js';


async function getAll(filter = {}) {
    let movies = await prisma.movie.findMany();

    if(filter.search) {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    }

    if(filter.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }
    if(filter.year) {
        movies = movies.filter(movie => String(movie.year) === String(filter.year));
    }
    return movies;
}    

async function create(movieData) {
   const movie = await prisma.movie.create({
    data: movieData,
  });
  return movie;
}
async function getById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId
        }
    });
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