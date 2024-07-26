// lib/jwt.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET

export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

export async function verifyToken(token) {
  try {
    const result = await jwt.verify(token, SECRET_KEY);
    return result 
  } catch (err) {
    return null;
  }
}