// app/api/auth/route.js
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/jwt';
import bcrypt from 'bcrypt'; // Asegúrate de instalar bcrypt para manejar contraseñas
import { findUserByEmail } from '@/lib/user';
import clientPromise from '@/utils/mongodb';

const SALT_ROUNDS = 10; // Número de rondas de salting para bcrypt


export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('solera'); // Nombre de tu base de datos
  const usersCollection = db.collection('users');

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Insertar el usuario en la base de datos
  await usersCollection.insertOne({
    email: email,
    passwordHash: hashedPassword,
  });

  return NextResponse.json({ success: true }, { status: 200 });
}