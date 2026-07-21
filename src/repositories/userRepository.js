import { prisma } from "../lib/prisma.js";

export async function create(userData) {
   const result = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
      }
   });

   return result;
}

export async function findByEmail(email) {
   return prisma.user.findUnique({
      where: { email },
   });
}

const userRepository = {
    create,
    findByEmail,
}

export default userRepository;
