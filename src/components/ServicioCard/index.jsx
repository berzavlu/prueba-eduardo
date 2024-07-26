"use client";
import React from 'react';

const ServicioCard = ({ servicio, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm">
      <h2 className="text-xl font-bold">{servicio.nombre}</h2>
      <p className="text-gray-700">{servicio.descripcion}</p>
      <p className="text-gray-500 text-sm">Categoría: {servicio.categoria}</p>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => onEdit(servicio)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(servicio._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ServicioCard;