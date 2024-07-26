// pages/servicios.js
"use client";
import React, { useState, useEffect } from 'react';
import ServicioCard from '@/components/ServicioCard';
import ServicioForm from '@/components/ServicioForm';
import ConfirmationModal from '@/components/ConfirmationModal';
import { toast } from 'react-toastify';

const Servicios = () => {
  const [servicios, setServicios] = useState(null);
  const [editando, setEditando] = useState(null);
  const [categoria, setCategoria] = useState('Todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [servicioAEliminar, setServicioAEliminar] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    fetchServicios();
  }, [categoria]);

  const fetchServicios = async () => {
    setLoading(true); // Comienza la carga
    const url = categoria === 'Todos' ? '/api/servicios' : `/api/servicios?categoria=${categoria}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setServicios(data);
    } catch (error) {
      toast.error('Error al cargar los servicios');
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  const handleSave = async (servicio) => {
    if (servicio.id) {
      await fetch(`/api/servicios/${servicio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicio)
      });
      setServicios(servicios.map(s => (s._id === servicio.id ? servicio : s)));
      toast.success('Servicio actualizado');
    } else {
      const res = await fetch('/api/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicio)
      });
      const data = await res.json();
      setServicios([...servicios, data]);
      toast.success('Servicio creado');
    }
  };

  const handleDelete = (id) => {
    setServicioAEliminar(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (servicioAEliminar) {
      await fetch(`/api/servicios/${servicioAEliminar}`, {
        method: 'DELETE'
      });
      setServicios(servicios.filter(s => s._id !== servicioAEliminar));
      toast.success('Servicio eliminado');
    }
    setModalOpen(false);
  };

  const handleEdit = (servicio) => {
    setEditando(servicio);
  };

  const handleCategoriaChange = (nuevaCategoria) => {
    setCategoria(nuevaCategoria);
  };

  const loadIcon = () => {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="mt-10 p-8">
      <h1 className="text-2xl font-bold mb-8">Servicios</h1>
      <div className="mb-4 flex space-x-4">
        {['Todos', 'Autos', 'Salud', 'Hogar'].map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoriaChange(cat)}
            className={`px-4 py-2 rounded-md ${categoria === cat ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="mb-8">
        <ServicioForm onSave={handleSave} onCancel={() => setEditando(null)} servicioActual={editando} />
      </div>
      {loading ? loadIcon() : (
        <div className="grid grid-cols-3 gap-4">
          {servicios && servicios.length > 0 ? (
            servicios.map(servicio => (
              <ServicioCard
                key={servicio._id}
                servicio={servicio}
                onEdit={handleEdit}
                onDelete={() => handleDelete(servicio._id)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              {(loading || !servicios) ? loadIcon() : 'No hay servicios disponibles.'}
            </div>
          )}
        </div>
      )}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message="¿Estás seguro de que deseas eliminar este servicio?"
      />
    </div>
  );
};

export default Servicios;