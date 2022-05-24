import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Formulario = ({cliente, cargando}) => {

//   const handleAgregar = () => {
//     Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
        
//       })
//   }  

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "Nombre muy corto")
      .max(40, "Nombre muy largo")
      .required("El nombre del Cliente es Obligatorio"),

    empresa: Yup.string().required("El nombre de la Empresa es Obligatorio"),

    email: Yup.string()
              .email('Email no válido')
              .required("El Email es Obligatorio"),
    telefono: Yup.number()
              .positive('Número no válido')
              .integer('Número no válido')
              .typeError('El número no es válido'),

    fecha: Yup.date()
              .required('La Fecha es Obligatoria'),
    
  });

  const handleSubmit = async (valores) => {
      try {     
        let respuesta;
        if(cliente.id) {
          // Editando un Registro
          const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
          respuesta = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(valores),
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          
        } else {
          // Nuevo Registro
          const url = import.meta.env.VITE_API_URL
          respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(valores),
            headers: {
              'Content-Type' : 'application/json'
            }
          })
            
        }

        await respuesta.json()
        navigate('/clientes')
      }catch (error) {
        console.log(error)
      }
  };

  // 

  return (
    cargando ? <Spinner /> : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl text-center">
        {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",  // Con OT -> cliente.nombre ? cliente.nombre : "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          fecha: cliente?.fecha ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}

        onSubmit={ async (values, {resetForm}) => {
          await handleSubmit(values);

          resetForm();
        }}

        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              {/* CLIENTE */}
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre:
                </label>

                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              {/* EMPRESA */}
              <div>
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa:
                </label>

                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="text-gray-800">
                  Email:
                </label>

                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              {/* TELÉFONO */}
              <div>
                <label htmlFor="telefono" className="text-gray-800">
                  Teléfono:
                </label>

                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Teléfono del Cliente"
                  name="telefono"
                />
              </div>
              {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}

              {/* FECHA */}
              <div>
                <label htmlFor="fecha" className="text-gray-800">
                  Fecha Alta:
                </label>

                <Field
                  id="fecha"
                  type="date"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="fecha"
                />
              </div>
              {errors.fecha && touched.fecha ? (
                  <Alerta>{errors.fecha}</Alerta>
                ) : null}

              {/* NOTAS */}
              <div>
                <label htmlFor="notas" className="text-gray-800">
                  Notas:
                </label>

                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                // onClick={handleAgregar}
                type="submit"
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                className="mt-5 w-full bg-indigo-800 p-3 
                    text-white uppercase font-bold text-lg cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
    )
  );
};


Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario;
