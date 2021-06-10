import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProvider } from "src/app/interfaces/provider.interface";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  listProviders(): Observable<IProvider[]> {
    return this.http.get<IProvider[]>(`${environment.baseUrl}/v1/providers/`);
  }

  submitProviders(provider: any): any {
    provider.inputSupportedTypes = [provider.inputSupportedTypes],
    provider.outputSupportedTypes = [provider.outputSupportedTypes],
    provider.operations = [
      {
        type: "column",
        description: "operation description",
        params: [
          {
            type: "text",
            key: "columns",
            example: "Hugo_Symbol, Chromosome",
          },
        ],
      },
    ];

    console.log(provider)
    return this.http.post<any>(
      `${environment.baseUrl}/v1/providers/`,
      provider
    );
  }
}
