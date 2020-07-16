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


export function InputDecorator(
  config: InputTextFieldInterface
) {
  return (target: any, key: string | symbol) => {
    let val = target[key];
    val = config;
    config.type.typeName = 'input-text';
    const getter = () => {
      return val;
    };
    const setter = (next) => {
      console.log(next);
      val = next;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
