import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { agregarCliente } from '../data/clientes';


export async function action ({request}) {
  const formData = await request.formData()

  const datos = Object.fromEntries(formData)

  const email = formData.get('email')
  
  //Validacion de si hay campo vacio
  const errores = []
  if(Object.values(datos).includes(''))
  errores.push('Todos los campos son Obligatorios')

  //Validacion que sea un Email (lo traemos de Git)
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)) {
    errores.push('El email no es valido')
  }

  //Retornar el Mensaje de Error si lo hay
  if(Object.keys(errores).length)
  return errores

  await agregarCliente(datos)
  return redirect('/')

}

function NuevoCliente() {

  const errores = useActionData();
  const navigate = useNavigate ();

  return (
    <>
      <div className='md:flex justify-between inline-block'>
        <div className='inline-block'>
          <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
          <p className='mt-3'>Llena todos los campos para registrar un Nuevo Cliente</p>
        </div>

        <div>
          <button
            onClick={() => navigate (-1)}
            className='bg-blue-800 text-white px-3 py-1 font-bold uppercase mt-3'
          >
            Volver
          </button>
        </div>
      </div>

      <div className='bg-white shadow rounded-md mx-auto px-5 py-10 mt-5'>

        {errores?.length && errores.map( (errores, i)  => <Error key={i}> {errores} </Error> )}
        <Form
          method='post'
          noValidate
        >
          <Formulario/>

          <input 
            type='submit'
            className='w-full bg-blue-800 text-white text-lg mt-5 p-3 uppercase font-bold'
            value='Registrar Cliente'
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente