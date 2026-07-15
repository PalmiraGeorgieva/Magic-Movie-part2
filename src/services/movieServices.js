import movieRepository from '../repositories/movieRepository.js';

async function getAll(filter = {}) {
    return movieRepository.getAll(filter);
}

async function create(movieData) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    return movieRepository.create(movieData);
}

async function getById(movieId) {
    const id = Number(movieId);
    return movieRepository.getById(id);
}

async function search(searchParams) {
    return movieRepository.search(searchParams);
}
async function attachArtist(movieId, artistId) {
    const movieNumber = Number(movieId);
    const artistNumber = Number(artistId);
    const result = await movieRepository.attachArtist(movieNumber, artistNumber);
    return result;
}
const movieServices = {
    getAll,
    create,
    getById,
    search
};

export default movieServices;