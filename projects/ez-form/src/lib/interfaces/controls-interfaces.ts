import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// Principal Form Field
export interface PrincipalFormFieldInterface {
    controlName: string;
    placeholder?: string;
    label?: string;
    type: PrincipalTypeInterface;
    validators?: ((control: AbstractControl) => ValidationErrors | null)[] | ((param: number | Array<string>) => ValidatorFn)[];
    disabled?: boolean;
    hint?: string;
    errorMessages?: { [key: string]: string };
}
// InputText Field
export interface InputTextFieldInterface extends PrincipalFormFieldInterface{
  type: InputTextTypeInterface;
}
// TextArea Field
export interface TextAreaFieldInterface extends PrincipalFormFieldInterface{
  type: TextAreaInterface;
}
// Selection Field
export interface SelectionFieldInterface extends PrincipalFormFieldInterface{
  type: SelectionTypeInterface;
}
// SimpleSelect Field
export interface SimpleSelectFieldInterface extends PrincipalFormFieldInterface{
  type: SimpleSelectTypeInterface;
}
// radio Field
export interface RadioFieldInterface extends PrincipalFormFieldInterface {
  type: RadioTypeInterface;
}
// check Field
export interface CheckFieldInterface extends PrincipalFormFieldInterface {
  type: CheckTypeInterface;
}
// Date Field
export interface DateFieldInterface extends PrincipalFormFieldInterface{
  type: DateTypeInterface;
}
// File Field
export interface FileFieldInterface extends PrincipalFormFieldInterface{
  type: FileTypeInterface;
}
// AutoComplete Field
export interface AutoCompleteFieldInterface extends PrincipalFormFieldInterface{
  type: AutoCompleteTypeInterface;
}


export interface PrincipalTypeInterface {
    typeName: 'textArea' | 'input-text' | 'file' | 'date' | 'password' | 'radio' | 'check' | 'select' | 'autoComplete';
}
// input-text
export interface InputTextTypeInterface extends PrincipalTypeInterface {
    typeName: 'input-text' | 'textArea';
    maxLength?: number;
    minLenght?: number;
    class?: 'password';
}
// text-area
export interface TextAreaInterface extends InputTextTypeInterface {
    typeName: 'textArea';
    rows?: number;
}
// option
export interface OptionInterface {
    value: any;
    label: string;
}
// selection
export interface SelectionTypeInterface extends PrincipalTypeInterface {
    typeName: 'select' | 'radio' | 'check';
    options: OptionInterface[];
}
// select
export interface SimpleSelectTypeInterface extends SelectionTypeInterface {
    typeName: 'select';
}
// radio
export interface RadioTypeInterface extends SelectionTypeInterface {
    typeName: 'radio';
}
// check
export interface CheckTypeInterface extends SelectionTypeInterface {
    typeName: 'check';
    minRequired?: number;
}
// date
export interface DateTypeInterface extends PrincipalTypeInterface {
    typeName: 'date';
}


// table-headers
export interface TableHeadersInterface {
    actions: string;
    description: string;
}


// file
export interface FileTypeInterface extends PrincipalTypeInterface {
    typeName: 'file';
    multiple?: boolean;
    accept: string;
    showFile: boolean;
    tableHeaders?: TableHeadersInterface;
}

// autoComplete
export interface AutoCompleteTypeInterface extends PrincipalTypeInterface {
    typeName: 'autoComplete';
    completeMethod: (event: { query: string } | string, context: Component) => Observable<HashMap<any>[]>;
    showAttribute: string;
    componentReference: Component | Object;
}

export interface HashMap<T> {
    [key: string]: T;
}
