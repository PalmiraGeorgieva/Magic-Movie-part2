import movieRepository from '../repositories/movieRepository.js';

async function getAll(filter = {}) {
    return movieRepository.getAll(filter);
}

async function create(movieData) {
    return movieRepository.create(movieData);
}

async function getById(movieId) {
    return movieRepository.getById(movieId);
}

async function search(searchParams) {
    return movieRepository.search(searchParams);
}

const movieServices = {
    getAll,
    create,
    getById,
    search
};

export default movieServices;