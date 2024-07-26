import clientPromise from '@/utils/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db('solera');
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get('categoria');

  const query = categoria ? { categoria } : {};
  const servicios = await db.collection('servicios').find(query).toArray();
  
  return NextResponse.json(servicios);
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('solera');
  const body = await req.json();

  if (!body.nombre || !body.descripcion || !body.categoria) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const newServicio = {
    nombre: body.nombre,
    descripcion: body.descripcion,
    categoria: body.categoria,
    createdAt: new Date()
  };

  const result = await db.collection('servicios').insertOne(newServicio);
  newServicio._id = result.insertedId;

  return NextResponse.json(newServicio, { status: 201 });
}