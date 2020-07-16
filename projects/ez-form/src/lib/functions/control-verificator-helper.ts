import {
  SelectionTypeInterface,
  PrincipalTypeInterface,
  InputTextTypeInterface,
} from 'ez-form/lib/interfaces/controls-interfaces';
import { InputTextFieldInterface } from '../interfaces/controls-interfaces';

export class ControlVerificatorHelper {

  static esSeleccionInterface(
    control: PrincipalTypeInterface
  ): control is SelectionTypeInterface {
    return 'options' in control;
  }

  static esInputTextControl(
    control: PrincipalTypeInterface
  ): control is InputTextTypeInterface {
    return 'maxLength' in control ||
      'minLength' in control ||
      'isTextArea' in control ||
      'rows' in control;
  }
}
