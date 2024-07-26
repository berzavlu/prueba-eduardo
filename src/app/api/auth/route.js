// app/api/auth/route.js
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/jwt';
import { compare } from 'bcrypt';
import { findUserByEmail } from '@/lib/user';

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await findUserByEmail(email);

  if (!user || !(await compare(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
  }

  const token = generateToken(user);

  const response = NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });
  response.cookies.set('authToken', token, { httpOnly: true, path: '/' }); // Establece la cookie

  return response;
}