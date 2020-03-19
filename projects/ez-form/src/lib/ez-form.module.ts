import {NgModule} from '@angular/core';
import {EzFormComponent} from './ez-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import {BsInputComponent} from './componentes-auxiliares/bs-input/bs-input.component';
import {ImgItemComponent} from './componentes-auxiliares/img-item/img-item.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TableModule} from 'primeng/table';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    EzFormComponent,
    BsInputComponent,
    ImgItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    AutoCompleteModule,
    TableModule,
    MatNativeDateModule,
  ],
  exports: [
    EzFormComponent,
    BsInputComponent,
  ],
})
export class EzFormModule {
}
