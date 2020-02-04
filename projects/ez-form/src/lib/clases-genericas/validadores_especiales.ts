import {FormGroup, ValidatorFn} from '@angular/forms';

export function validarMinimoCheckBox( minimosRequeridos = 1): ValidatorFn {
  return function validar(formGroup: FormGroup) {
    let totalDeSeleccionados = 0;
    const controlesCheckBox = Object.keys(formGroup.controls);
    controlesCheckBox.forEach(key => {
      const control = formGroup.controls[key];
      const estaSeleccionado = control.value === true;
      if (estaSeleccionado) {
        totalDeSeleccionados++;
      }
    });
    const cumpleConElMinimoRequerido = totalDeSeleccionados < minimosRequeridos;
    if (cumpleConElMinimoRequerido) {
      return {
        required: true,
      };
    }
    return null;
  };
}
