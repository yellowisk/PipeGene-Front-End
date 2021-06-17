import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
})
export class DynamicFormComponent implements OnInit {
  operation = {
    params: [
      {
        type: "text",
        name: "Columns",
        key: "columns",
        example: "Hugo_Symbol, Chromosome",
      },
      {
        type: "text",
        name: "TestOne",
        key: "columns",
        example: "Hugo_Symbol, Chromosome",
      },
      {
        type: "text",
        name: "Teste two",
        key: "columns",
        example: "Hugo_Symbol, Chromosome",
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}

  getControlError(control: any): void {
    console.log(control)
  }
}
