import userRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';

export async function register(userData) {
   const hashPassword = await bcrypt.hash(userData.password, 10);
   const result = await userRepository.create({
    ...userData,
    password: hashPassword,
  });

  return result;
}

const authService = {
    register,
}

export default authService;