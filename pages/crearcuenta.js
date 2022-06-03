import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta'

const CrearCuenta = () => {

  const AuthContext = useContext(authContext);
  const { mensaje, registrarUsuario } = AuthContext;

  const formik = useFormik({
      initialValues: {
        nombre: '',
        email: '',
        password: ''
      },
      validationSchema: Yup.object({
          nombre: Yup.string()
                    .required('Digita un nombre'),
          email: Yup.string()
                    .email('Intenta con un email válido')
                    .required('Digita un email'),
          password: Yup.string()
                    .required('Digita una contraseña')
                    .min(6, 'El password debe contener al menos 6 caracteres')
      }),
      onSubmit: valores => {
          registrarUsuario(valores)
      }
  });


  return ( 
    <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          <h2 className="text-3xl font-sans font-bold text-blue-700 text-center uppercase my-5">Crear Cuenta</h2>

          { mensaje && <Alerta  />}

          <div className="flex justify-center mt-5">
              <div className="w-full max-w-lg">
                  <form
                    className="bg-white rounded-md shadow-lg px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                  >
                      <div className="mb-4">
                          <label 
                            className="block text-blue-600 text-sm font-bold uppercase mb-2"
                            htmlFor="nombre"
                          >Nombre</label>
                          <input
                              type="text"
                              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="nombre"
                              placeholder="Nombre de Usuario"
                              value={formik.values.nombre}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />

                          { formik.touched.nombre && formik.errors.nombre ? (
                            <div className="my-2 bg-gray-100 border-l-4 border-red-600 text-red-700 p-1">
                                <p className="font-bold">¡Ups, algo va mal!</p>
                                <p>{formik.errors.nombre} </p>
                            </div>
                          ) : null }
                      </div>

                      <div className="mb-4">
                          <label 
                            className="block text-blue-600 text-sm font-bold uppercase mb-2"
                            htmlFor="email"
                          >Email</label>
                          <input
                              type="email"
                              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              placeholder="Email de Usuario"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                          { formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-gray-100 border-l-4 border-red-600 text-red-700 p-1">
                                <p className="font-bold">¡Ups, algo va mal!... ¿De nuevo?</p>
                                <p>{formik.errors.email} </p>
                            </div>
                          ) : null }
                      </div>

                      <div className="mb-4">
                          <label 
                            className="block text-blue-600 text-sm font-bold uppercase mb-2"
                            htmlFor="password"
                          >Password</label>
                          <input
                              type="password"
                              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="password"
                              placeholder="Password de Usuario"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                          { formik.touched.password && formik.errors.password ? (
                            <div className="my-2 bg-gray-100 border-l-4 border-red-600 text-red-700 p-1">
                                <p className="font-bold">¡Ups, algo va mal!... Really!?</p>
                                <p>{formik.errors.password} </p>
                            </div>
                          ) : null }
                      </div>

                      <input 
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-500 w-full p-3 mt-3 text-white uppercase font-bold"
                        value="Crear Cuenta"
                      />
                  </form>
              </div>
          </div>
        </div>
    </Layout>
   );
}
 
export default CrearCuenta;