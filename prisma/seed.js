import fs from 'node:fs/promises';
import { prisma } from '../src/lib/prisma.js';

const database = JSON.parse(
    await fs.readFile(new URL('../src/db.json', import.meta.url), 'utf8')
);

const movies = database.movies.map(movie => ({
    title: movie.title,
    category: movie.category,
    genre: movie.genre,
    director: movie.director.trim(),
    year: Number(movie.year),
    imageUrl: movie.imageUrl ?? movie.image,
    rating: Number(movie.rating),
    description: movie.description,
    releaseDate: new Date(`${movie.year}-01-01T00:00:00.000Z`),
}));

try {
    const movieCount = await prisma.movie.count();

    if (movieCount === 0) {
        const result = await prisma.movie.createMany({ data: movies });
        console.log(`Seeded ${result.count} movies.`);
    } else {
        console.log(`Seed skipped: the database already contains ${movieCount} movies.`);
    }
} finally {
    await prisma.$disconnect();
}
