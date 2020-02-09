import {ObjetoArchivoInterface} from '../interfaces/objeto.archivo.interface';

export function llenarGaleria(palabraThis, event, update = false) {
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

export function quitarArchivoLista(nombreArchivo: string, listaArchivos: any[]) {
  console.log(listaArchivos[0]);
  const valores = Object.values(listaArchivos[0]);
  const archivosActualizados = valores.filter(
    (archivo: File) => {
      return archivo.name !== nombreArchivo;
    }
  );
  const diccionarioArchivos = {};
  archivosActualizados.forEach(
    (archivo, index) => {
      diccionarioArchivos[index] = archivo;
    }
  );
  listaArchivos[0] = diccionarioArchivos;
  return listaArchivos;
}

