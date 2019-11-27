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
          const formatoAcceptado = palabraThis.accept;
          if (formatoAcceptado && archivo.type.match(formatoAcceptado)) {
            const objetoArchivo: ObjetoArchivoInterface = {
              propietario: palabraThis.controlName,
              datos: reader.result,
              nombreArchivo: archivo.name,
            };
            palabraThis.listaObjetosArchivos.push(objetoArchivo);
            palabraThis.esconderArchivos = false;
          } else {
            palabraThis.esconderArchivos = true;
          }
        }
      };
      if (archivo) {
        reader.readAsDataURL(archivo);
      }
    }
  );
}
