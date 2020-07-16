import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


export type TypeName = 'textArea' | 'input-text' | 'file' | 'date' | 'password' | 'radio' | 'check' | 'select' | 'autoComplete';
// Principal Form Field
export interface BaseFormField {
    controlName: string;
    placeholder?: string;
    label?: string;
    type?: PrincipalTypeInterface;
    validators?: ((control: AbstractControl) => ValidationErrors | null)[] | ((param: number | Array<string>) => ValidatorFn)[];
    disabled?: boolean;
    hint?: string;
    errorMessages?: { [key: string]: string };
}
// InputText Field
export interface InputTextFieldInterface extends BaseFormField{
  type: InputTextTypeInterface;
}
// TextArea Field
export interface TextAreaFieldInterface extends BaseFormField{
  type: TextAreaInterface;
}
// Selection Field
export interface SelectionFieldInterface extends BaseFormField{
  type: SelectionTypeInterface;
}
// SimpleSelect Field
export interface SimpleSelectFieldInterface extends BaseFormField{
  type: SimpleSelectTypeInterface;
}
// radio Field
export interface RadioFieldInterface extends BaseFormField {
  type: RadioTypeInterface;
}
// check Field
export interface CheckFieldInterface extends BaseFormField {
  type: CheckTypeInterface;
}
// Date Field
export interface DateFieldInterface extends BaseFormField{
  type?: DateTypeInterface;
}
// File Field
export interface FileFieldInterface extends BaseFormField{
  type?: FileTypeInterface;
}
// AutoComplete Field
export interface AutoCompleteFieldInterface extends BaseFormField{
  type?: AutoCompleteTypeInterface;
}


export interface PrincipalTypeInterface {
    typeName?: TypeName;
    value?: any;
}
// input-text
export interface InputTextTypeInterface extends PrincipalTypeInterface {
    typeName?: 'input-text' | 'textArea';
    maxLength?: number;
    minLenght?: number;
    class?: 'password';
}
// text-area
export interface TextAreaInterface extends InputTextTypeInterface {
    typeName?: 'textArea';
    rows?: number;
}
// option
export interface OptionInterface {
    value: any;
    label: string;
}
// selection
export interface SelectionTypeInterface extends PrincipalTypeInterface {
    typeName?: 'select' | 'radio' | 'check';
    options: OptionInterface[];
}
// select
export interface SimpleSelectTypeInterface extends SelectionTypeInterface {
    typeName?: 'select';
}
// radio
export interface RadioTypeInterface extends SelectionTypeInterface {
    typeName?: 'radio';
}
// check
export interface CheckTypeInterface extends SelectionTypeInterface {
    typeName?: 'check';
    minRequired?: number;
}
// date
export interface DateTypeInterface extends PrincipalTypeInterface {
    typeName?: 'date';
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
