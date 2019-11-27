import {ObjetoArchivoInterface} from '../interfaces/objeto.archivo.interface';

export function llenarGaleria(palabraThis, event) {
  const objetoArchivos: File[] = Object.values(event);
  palabraThis.listaObjetosArchivos = [];
  palabraThis.totalArchivos = objetoArchivos.length ? objetoArchivos.length : 0;
  objetoArchivos.forEach(
    (archivo: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const formato = archivo.type;
          const objetoArchivo: ObjetoArchivoInterface = {
            propietario: palabraThis.controlName,
            datos: reader.result,
            nombreArchivo: archivo.name,
            formato
          };
          palabraThis.listaObjetosArchivos.push(objetoArchivo);
        }
      };
      if (archivo) {
        reader.readAsDataURL(archivo);
      }
    }
  );
}
