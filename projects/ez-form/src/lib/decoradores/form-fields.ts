import {
  AutoCompleteFieldInterface,
  CheckFieldInterface, DateFieldInterface, FileFieldInterface,
  InputTextFieldInterface, RadioFieldInterface,
  SimpleSelectFieldInterface,
  TextAreaFieldInterface
} from '../interfaces/controls-interfaces';
import {delegateDecorator} from './delegator';

export function InputTextField(
  config: InputTextFieldInterface
) {
  return delegateDecorator<InputTextFieldInterface>(
    'input-text',
    config,
  );
}

export function TextAreaField(
  config: TextAreaFieldInterface
) {
  return delegateDecorator<TextAreaFieldInterface>(
    'textArea',
    config,
  );
}

export function SimpleSelectField(
  config: SimpleSelectFieldInterface
) {
  return delegateDecorator<SimpleSelectFieldInterface>(
    'select',
    config,
  );
}

export function RadioButtonField(
  config: RadioFieldInterface
) {
  return delegateDecorator<RadioFieldInterface>(
    'radio',
    config,
  );
}

export function CheckButtonField(
  config: CheckFieldInterface
) {
  return delegateDecorator<CheckFieldInterface>(
    'check',
    config,
  );
}

export function AutoCompleteField(
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
