import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Alerta from '../components/Alerta';
import Dropzone from '../components/Dropzone';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';


const Index = () => {

  const AuthContext = useContext( authContext );
  const { usuarioAutenticado } = AuthContext;

  const AppContext = useContext( appContext );
  const { mensaje_archivo, url } = AppContext;
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      usuarioAutenticado()
    }
   
  }, []);

  return ( 
    <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          { url ? (
            <>
              <p className="text-center text-2xl mt-10">
                  <span className="font-bold text-blue-700 text-3xl uppercase">Tu enlace de descarga es:</span> {`${process.env.frontendURL}/enlaces/${url}`} 
              </p>
              <button 
                  type="button"
                  className="bg-blue-700 hover:bg-blue-400 w-full p-3 rounded-lg shadow-lg shadow-blue-500/50 text-white uppercase font-bold mt-10"
                  onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}enlaces/${url}`) }
              >Copia tu enlace dando click aca </button>
            </>
          ) : (
            <>
            { mensaje_archivo && <Alerta /> }

              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                  <Dropzone />
                  
                  <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                      <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Comparte archivos de forma rapida</h2> 
                      <p className="text-lg leading-loose">
                        <span className="text-green-600 font-bold">SendMe</span> te permitira compartir archivos y posteriormente eliminarlos después de ser descargados. Así podras tener control sobre las descargas y asegurarte de que tus cosas no permanezcan en línea para siempre.
                      </p>
                      <Link href="/crearcuenta">
                          <a className="text-green-600 font-bold text-lg hover:text-blue-500">Crea una cuenta para subir archivos de mayor tamaño</a>
                      </Link>

                  </div>
              </div>
            </>
          )}
        </div>
    </Layout>
   );
}
 
export default Index;