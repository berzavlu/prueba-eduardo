// middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt'; // Ajusta la ruta según tu estructura

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Permite el acceso a los archivos estáticos y recursos
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
    return NextResponse.next();
  }

  // Permite el acceso a la ruta de inicio de sesión
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Permite el acceso a la ruta de autenticación
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Verifica el token para rutas API y otras rutas
  if (pathname.startsWith('/api/') || !pathname.startsWith('/login')) {
    const token = req.cookies.get('authToken');
    
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const verified = verifyToken(token.value);

    if (!verified) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
  }

  return NextResponse.next();
}