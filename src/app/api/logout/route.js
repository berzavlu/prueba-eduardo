import { NextResponse } from 'next/server';

export async function GET(req) {
  // Elimina la cookie de autenticación
  const response = NextResponse.redirect(new URL('/login', req.url));
  response.cookies.delete('authToken'); // Asegúrate de que el nombre de la cookie sea 'authToken'

  return response;
}