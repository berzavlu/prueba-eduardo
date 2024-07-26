// components/ServicioForm.js
"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ServicioForm = ({ onSave, onCancel, servicioActual }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (servicioActual) {
      setNombre(servicioActual.nombre);
      setDescripcion(servicioActual.descripcion);
      setCategoria(servicioActual.categoria);
    } else {
      // Limpiar formulario si no hay servicio actual
      setNombre('');
      setDescripcion('');
      setCategoria('');
    }
  }, [servicioActual]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !categoria) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    try {
      await onSave({ id: servicioActual?._id, nombre, descripcion, categoria });
      // Limpia el formulario después de guardar los datos
      setNombre('');
      setDescripcion('');
      setCategoria('');
    } catch (error) {
      toast.error('Error al guardar el servicio');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Selecciona una categoría</option>
          <option value="Autos">Autos</option>
          <option value="Salud">Salud</option>
          <option value="Hogar">Hogar</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Grabar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ServicioForm;