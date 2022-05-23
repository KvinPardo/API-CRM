import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }

      setCargando(!cargando);
      
    };
    obtenerClienteAPI();
  }, []);

  return (
    <>
        <h1 className='font-black text-4xl text-indigo-900'>Editar Cliente</h1>
        <p className='mt-3'>Aquí puedes <span className='text-indigo-600'>Editar los DATOS de un Cliente</span></p>

        {cliente?.nombre ? (
          <Formulario 
            cliente={cliente}
            cargando={cargando}
          />
        ): <p className='text-indigo-600 text-bold text-2xl'>No existen Registros de este Cliente</p>}
        
    </>
  )
}

export default EditarCliente