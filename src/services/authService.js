import userRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(userData) {
   const hashPassword = await bcrypt.hash(userData.password, 10);
   const result = await userRepository.create({
    ...userData,
    password: hashPassword,
  });

  return result;
}

export async function login(email, password) {
   const user = await userRepository.findByEmail(email);

   if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid email or password');
   }
   const payload = { userId: user.id, email: user.email };
   const token = jwt.sign(payload, 'SECRETGOESHERE', { expiresIn: '1h'});
   return token;
}

const authService = {
    register,
    login,
}

export default authService;
