import {NgModule} from '@angular/core';
import {EzFormComponent} from './ez-form.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {BsInputComponent} from './componentes-auxiliares/bs-input/bs-input.component';
import {ImgItemComponent} from './componentes-auxiliares/img-item/img-item.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TableModule} from 'primeng/table';
import {MatNativeDateModule} from '@angular/material/core';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng';


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
    ToastModule,
  ],
  exports: [
    EzFormComponent,
    BsInputComponent,
  ],
  providers: [
    MessageService,
  ]
})
export class EzFormModule {
}
