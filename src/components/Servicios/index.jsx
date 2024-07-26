"use client";
import React, { useState, useEffect } from 'react';
import ServicioCard from '@/components/ServicioCard';
import ServicioForm from '@/components/ServicioForm';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [categoria, setCategoria] = useState('Todos');

  useEffect(() => {
    fetchServicios();
  }, [categoria]);

  const fetchServicios = () => {
    const url = categoria === 'Todos' ? '/api/servicios' : `/api/servicios?categoria=${categoria}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setServicios(data));
  };

  const handleSave = (servicio) => {
    if (servicio.id) {
      fetch(`/api/servicios/${servicio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicio)
      }).then(() => {
        setServicios(servicios.map(s => (s._id === servicio.id ? servicio : s)));
        setEditando(null);
      });
    } else {
      fetch('/api/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicio)
      }).then(res => res.json())
        .then(data => {
          setServicios([...servicios, data]);
          setEditando(null);
        });
    }
  };

  const handleDelete = (id) => {
    fetch(`/api/servicios/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setServicios(servicios.filter(s => s._id !== id));
    });
  };

  const handleEdit = (servicio) => {
    setEditando(servicio);
  };

  const handleCategoriaChange = (nuevaCategoria) => {
    setCategoria(nuevaCategoria);
  };

  return (
    <div className="p-8">
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
      <div className="grid grid-cols-3 gap-4">
        {servicios.map(servicio => (
          <ServicioCard key={servicio._id} servicio={servicio} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Servicios;