import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OperationsModalFormComponent } from "./operations-modal-form.component";
import { ProviderParametersFormComponent } from "../provider-parameters-form/provider-parameters-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [OperationsModalFormComponent, ProviderParametersFormComponent],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [],
  exports: [OperationsModalFormComponent],
})
export class OperationsModule {}
