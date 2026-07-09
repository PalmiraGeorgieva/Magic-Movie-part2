import { prisma } from './db.js'

;(async () => {
  try {
    const movies = await prisma.movie.findMany()
    console.log('Movies:', movies)
  } catch (err) {
    console.error('Error querying movies:', err)
  } finally {
    await prisma.$disconnect()
  }
})()
