import clientPromise from '@/utils/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  const client = await clientPromise;
  const db = client.db('solera');
  const body = await req.json();

  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const { id } = params;
  const updateFields = {};

  if (body.nombre) updateFields.nombre = body.nombre;
  if (body.descripcion) updateFields.descripcion = body.descripcion;
  if (body.categoria) updateFields.categoria = body.categoria;

  const result = await db.collection('servicios').updateOne(
    { _id: new ObjectId(id) },
    { $set: updateFields }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 });
  }

  const updatedServicio = await db.collection('servicios').findOne({ _id: new ObjectId(id) });
  return NextResponse.json(updatedServicio);
}

export async function DELETE(req, { params }) {
  const client = await clientPromise;
  const db = client.db('solera');

  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const { id } = params;
  const result = await db.collection('servicios').deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 });
  }

  // Usa NextResponse con el código de estado 204 y sin cuerpo
  return new NextResponse(null, { status: 204 });
}