import movieRepository from '../repositories/movieRepository.js';

async function getAll(filter = {}) {
    return movieRepository.getAll(filter);
}

async function create(movieData, userId) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    movieData.userId = userId;
    return movieRepository.create(movieData);
}

async function getById(movieId) {
    const id = Number(movieId);
    return movieRepository.getById(id);
}

async function search(searchParams) {
    return movieRepository.search(searchParams);
}
export async function attachArtist(movieId, artistId) {
    const movieNumber = Number(movieId);
    const artistNumber = Number(artistId);
    const result = await movieRepository.attachArtist(movieNumber, artistNumber);
    return result;
}

export async function remove(movieId, userId) {
    const movie = await movieRepository.getById(movieId);

    if(!movie) {
        throw new Error('Movie not found');
    }

    if (movie.userId !== userId) {
        throw new Error("Unauthorized");
        
    }
    await movieRepository.remove(movieId, userId);
}
const movieServices = {
    getAll,
    create,
    getById,
    attachArtist,
    remove
};

export default movieServices;