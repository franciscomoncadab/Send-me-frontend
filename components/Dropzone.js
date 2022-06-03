import React, {  useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../config/axios';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Formulario from './Formulario';

const Dropzone = () => {

    const AppContext = useContext(appContext);
    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext;

    const AuthContext = useContext(authContext);
    const { usuario, autenticado } = AuthContext;

    const onDropRejected = () => {
        mostrarAlerta('Lo siento, crea una cuenta para subir archivos de mas de 1MB');
    }

    const onDropAccepted = useCallback( async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        subirArchivo(formData, acceptedFiles[0].path);
    }, []);


    const maxSize = autenticado ? 1000000000000 : 1000000;

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize});

    const archivos = acceptedFiles.map( archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{archivo.path}</p> 
            <p className="text-sm text-gray-500">{ (archivo.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
        </li>
    ) );




    return ( 
        <div className="md:flex-1 mb-2 mx-4 mt-16 lg:mt-1 flex flex-col items-center justify-center border-double border-blue-700 border-8 bg-gray-200 px-1">

            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>

                    {
                        autenticado ? <Formulario /> : ""
                    }

                    { cargando ? <p className="my-10 text-center text-gray-600">Subiendo Archivo...</p> : (
                        <button
                            type="button"
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            onClick={ () => crearEnlace()  }
                        >
                            Crear Enlace
                        </button>
                    )}


                </div>

            ) : (
                <div { ...getRootProps({ className: 'dropzone w-full py-32' }) }>
                    <input className="h-100 " { ...getInputProps() } />
                        {
                            isDragActive ? <p className="text-2xl text-center text-gray-600"> Deja caer tu archivo </p> :
                            <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Sube o arrastra tu archivo hasta aquí</p>
                                <button className="bg-blue-800 w-9/12 py-5 rounded-lg text-white font-bold my-10 hover:bg-blue-700" type="button">
                                    Clickea aca y sube tu archivo :D
                                </button>
                            </div>
                        }
                </div>
            ) }
        </div>
     );
}
 
export default Dropzone;