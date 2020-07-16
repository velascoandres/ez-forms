import {BaseFormField, TypeName} from '../interfaces/controls-interfaces';

export function delegateDecorator<T extends BaseFormField>(
  typeName: TypeName,
  config: T
) {
  return (target: any, key: string | symbol) => {
    let valorObjeto = target[key];
    config.type.typeName = typeName;
    valorObjeto = config;
    const getter = () => {
      return valorObjeto;
    };
    const setter = (next) => {
      valorObjeto.type.value = next;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
