"use client"
import Servicios from "@/components/Servicios";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    // Llama al endpoint de logout para eliminar la cookie
    const res = await fetch('/api/logout', { method: 'GET' });

    if (res.ok) {
      // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
      router.push('/login');
    } else {
      // Maneja el error si la solicitud de cierre de sesión falla
      toast.error('Error al cerrar sesión');
    }
  }

  return (
    <div>
      <div className="fixed top-0 right-0 p-4 bg-gray-800 text-white w-full flex justify-end items-center">
        <div className="cursor-pointer" onClick={handleLogout}>
          Cerrar sesión
        </div>
      </div>
      <Servicios />
    </div>
  );
}
