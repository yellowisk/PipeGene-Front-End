import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProvider } from 'src/app/interfaces/provider.interface';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  listProviders(): Observable<IProvider[]> {
    return this.http.get<IProvider[]>(`${environment.baseUrl}/v1/providers/`);
  }

  submitProviders(provider: IProvider): Observable<IProvider> {
    return this.http.post<IProvider>(
      `${environment.baseUrl}/v1/providers/`,
      provider
    );
  }
}
