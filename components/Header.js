import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';


const Header = () => {
 
    const router = useRouter();
 
  const AuthContext = useContext( authContext );
  const { usuario, usuarioAutenticado,  cerrarSesion } = AuthContext;

  const AppContext = useContext( appContext );
  const { limpiarState } = AppContext;

  useEffect(() => {
      usuarioAutenticado()
  }, []);

  const redireccionar = () => {
      router.push('/');
      limpiarState();
  }


  return ( 
      <header className="py-7 flex flex-col md:flex-row items-center justify-between">
          <img 
              onClick={() => redireccionar() }
              className="w-40 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" 
          />
   


          <div>
              {
                  usuario ? (
                      <div className="flex items-center">
                          <p className="mr-4 text-green-700 font-bold"> Welcome: {usuario.email}</p>
                          <button 
                              type="button"
                              className="bg-blue-700 hover:bg-blue-500 px-5 py-3 rounded-lg text-white font-bold uppercase"
                              onClick={() => cerrarSesion() }
                          >Cerrar Sesión</button>
                      </div>
                  ) : (
                      <>
                          <Link href="/login">
                              <a className="bg-blue-700 hover:bg-blue-500 px-6 py-4 rounded-lg text-white font-bold uppercase mr-6">Iniciar Sesión</a>
                          </Link>
                          <Link href="/crearcuenta">
                              <a className="bg-green-600 hover:bg-green-400 px-6 py-4 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
                          </Link>
                      </>
                  )
              }

          </div>
      </header>
   );

}

export default Header;