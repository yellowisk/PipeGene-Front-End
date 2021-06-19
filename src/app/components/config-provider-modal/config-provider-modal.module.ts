import { InputValidationModule } from "./../input-validation/input-validation.module";
import { DynamicFormComponent } from "./../dynamic-form/dynamic-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigProviderModalComponent } from "./config-provider-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ConfigProviderModalComponent, DynamicFormComponent],
  imports: [
    CommonModule,
    InputValidationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [ConfigProviderModalComponent],
})
export class ConfigProviderModalModule {}
