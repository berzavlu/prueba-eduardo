// lib/user.js
import clientPromise from '@/utils/mongodb';

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db('solera'); // Nombre de la base de datos

  return db.collection('users').findOne({ email });
}