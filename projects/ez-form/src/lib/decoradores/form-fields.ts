import {
  AutoCompleteFieldInterface,
  CheckFieldInterface, DateFieldInterface, FileFieldInterface,
  InputTextFieldInterface, RadioFieldInterface,
  SimpleSelectFieldInterface,
  TextAreaFieldInterface
} from '../interfaces/controls-interfaces';
import {delegateDecorator} from './delegator';

export function InputText(
  config: InputTextFieldInterface
) {
  return delegateDecorator<InputTextFieldInterface>(
    'input-text',
    config,
  );
}

export function TextArea(
  config: TextAreaFieldInterface
) {
  return delegateDecorator<TextAreaFieldInterface>(
    'textArea',
    config,
  );
}

export function SimpleSelect(
  config: SimpleSelectFieldInterface
) {
  return delegateDecorator<SimpleSelectFieldInterface>(
    'select',
    config,
  );
}

export function RadioButton(
  config: RadioFieldInterface
) {
  return delegateDecorator<RadioFieldInterface>(
    'radio',
    config,
  );
}

export function CheckButton(
  config: CheckFieldInterface
) {
  return delegateDecorator<CheckFieldInterface>(
    'check',
    config,
  );
}

export function AutoComplete(
  config: AutoCompleteFieldInterface
) {
  return delegateDecorator<AutoCompleteFieldInterface>(
    'autoComplete',
    config,
  );
}

export function DateField(
  config: DateFieldInterface
) {
  return delegateDecorator<DateFieldInterface>(
    'date',
    config,
  );
}

export function FileField(
  config: FileFieldInterface,
) {
  return delegateDecorator<FileFieldInterface>(
    'file',
    config,
  );
}
