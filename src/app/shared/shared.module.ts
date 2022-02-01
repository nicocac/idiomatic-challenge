import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleListComponent} from "./simple-list/simple-list.component";
import {EntityFormComponent} from './entity-form/entity-form.component';
import { DynamicInputComponent } from './dynamic-input/dynamic-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [
    SimpleListComponent,
    EntityFormComponent,
    DynamicInputComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SimpleListComponent,
    EntityFormComponent,
    DynamicInputComponent,
    ActionsComponent
  ]
})
export class SharedModule {
}
