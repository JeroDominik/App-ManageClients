import { useLoaderData } from 'react-router-dom'
import { obtenerClientes } from '../data/clientes';
import Cliente from '../components/Cliente';

export function loader () {
  const clientes = obtenerClientes()

  return clientes
}

function Index() {

  const clientes = useLoaderData();

  return (
    <>
      <h2 className="font-bold text-4xl text-blue-900">Clientes</h2>
      <p className="mt-3">Administra tus Clientes</p>

      {clientes.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className=' bg-blue-800 text-white '>
            <tr>
              <th className='p-2'>Clientes</th>
              <th className='p-2'>Contactos</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map( cliente => (
              <Cliente
                cliente={cliente}
                key={cliente.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center mt-10'>No hay Clientes aún</p>
      )} 

    </>
  )
}

export default Index