// Validaddores Archivos
import {FormControl, ValidatorFn} from '@angular/forms';

export class FileValidator {

  static maxSize(maxSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
      const esArchivo = file instanceof File;
      const superaElMaximo = esArchivo && file.size > maxSize * 1000;
      if (superaElMaximo) {
        return {fileMaxSize: true};
      }
    };
    return FileValidator.fileValidation(validatorFn);
  }

  static minSize(minSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
      if (file instanceof File && file.size < minSize * 1000) {
        return {fileMinSize: true};
      }
    };
    return FileValidator.fileValidation(validatorFn);
  }

  // validar extensiones de archivo
  static extensions(allowedExtensions: Array<string>): ValidatorFn {
    const funcionValidacion = (file: File) => {
      const existenExtenciones = allowedExtensions.length === 0;
      if (existenExtenciones) {
        return null;
      }
      const esArchivo = file instanceof File;
      if (esArchivo) {
        const ext = FileValidator.obtenerExtension(file.name);
        const noContieneExtension = allowedExtensions.indexOf(ext) === -1;
        if (noContieneExtension) {
          return {fileExtension: true};
        }
      }
    };
    return FileValidator.fileValidation(funcionValidacion);
  }

  private static obtenerExtension(nombreDelArchivo: string): null | string {
    if (nombreDelArchivo.indexOf('.') === -1) {
      return null;
    }
    return nombreDelArchivo.split('.').pop();
  }

  private static fileValidation(funcionDeValidacion: (File) => null | object): ValidatorFn {
    return (formControl: FormControl) => {
      const valores = Object.values(formControl.value);
      if (!valores.length) {
        return null;
      }
      const archivosDelFormulario = Object.values(valores[0]);
      const files: File[] = [];
      const isMultiple = Array.isArray(formControl.value);
      if (isMultiple) {
        for (const archivo of archivosDelFormulario) {
          return funcionDeValidacion(archivo);
        }
      } else {
        return funcionDeValidacion(archivosDelFormulario[0]);
      }
    };
  }

}
