import { useNavigate } from 'react-router-dom';


const Cliente = ({ cliente,handleEliminar }) => {

  const navigate = useNavigate()

  const { nombre, empresa, email, telefono, fecha, notas, id } = cliente;  

  return(
    <tr className='border-b hover:bg-gray-200'>
      <td className='p-3 text-center border'>{nombre}</td>
      <td className='p-3 text-center border'>{empresa}</td>
      <td className='p-3 border'>
        <p className='ml-10'><span className='text-gray-800 uppercase font-bold'>Email:</span>{email}</p>
        <p className='ml-10'><span className='text-gray-800 uppercase font-bold'>Teléfono:</span>{telefono}</p>
      </td>
      <td className='p-3 text-center border'>{fecha}</td>
      <td className='p-3 border'>
      <button 
          className='bg-yellow-500 hover:bg-yellow-600 block w-full
          text-white py-3 px-3 uppercase font-bold text-xs cursor-pointer '
          type='button'
          onClick={ () => navigate(`/clientes/${id}`)}
        
        >Ver</button>

        <button 
          type='button'
          className='bg-indigo-600 hover:bg-indigo-700 block w-full 
          text-white py-3 px-3 uppercase font-bold text-xs cursor-pointer mt-3'
          onClick={() => navigate(`/clientes/editar/${id}`)}
        
        >Editar</button>

        <button 
          className='bg-red-600 hover:bg-red-700 block w-full 
          text-white py-3 px-3 uppercase font-bold text-xs cursor-pointer mt-3'
          type='button'
          onClick={ () => handleEliminar(id)}
        
        >Eliminar</button>
      </td>
    </tr>
  )

  
};

export default Cliente;
