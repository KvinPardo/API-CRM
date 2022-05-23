import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  // Consultar API
  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClientesAPI();
  }, []);

  const handleEliminar = async id => { 
    // Este es el código que Elimina un Registro de la API
    const confirmar = confirm('¿Desea eliminar este Registro?')
    if(confirmar) {      

      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
          
        })      

        await respuesta.json();   
        const arrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(arrayClientes)          
      } catch (error) {
        console.log(error)
      }
    }
    
  }

  return (
    <>
      <h1 className="font-black text-4xl text-indigo-900">Clientes</h1>
      <p className="mt-3">
        <span className="text-indigo-600">Administra</span> tus Clientes
      </p>

      <table className="w-full mt-8 table-auto shadow bg-white ">
        <thead className="bg-indigo-800 text-white">
          <tr className="">
            <th className="p-2">Nombre:</th>
            <th className="p-2 border">Empresa:</th>
            <th className="p-2 border">Contacto:</th>
            <th className="p-2 border">Creación:</th>
            <th className="p-2 border">Acciones:</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <Cliente 
              key={cliente.id} 
              cliente={cliente} 
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
