import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  constructor(private readonly http: HttpClient) {}

  createExecution(execution: any): any {
    execution.executionSteps[0].params = {
      columns:
        'Hugo_Symbol, Chromosome, Start_Position, End_Position, Reference_Allele, Tumor_Seq_Allele2, Variant_Classification, Variant_Type, Tumor_Sample_Barcode',
    };

    execution.executionSteps[1].params = {
      columns: 'Hugo_Symbol, Chromosome',
    };

    console.log(execution);

    return this.http.post<any>(
      `${environment.baseUrl}/v1/projects/${execution.project}/executions`,
      {
        dataset: execution.dataset,
        executionSteps: execution.executionSteps,
        descriptions: execution.executionName
      }
    );
  }

  listExecutions(): any {
    return this.http.get<any>(`${environment.baseUrl}/v1/projects/e1d33cc3-f04d-45c8-8998-20cd0d4af878/executions`);
  }
}
