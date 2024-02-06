import { IProvider } from './../../../interfaces/provider.interface';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from 'src/app/interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  listProviders(): Observable<IProvider[]> {
    return this.http.get<IProvider[]>(`${environment.baseUrl}/api/v1/providers/`);
  }

  listAllProvidersWithPermission(projectId: string): Observable<IProvider[]> {
    return this.http.get<IProvider[]>(`${environment.baseUrl}/api/v1/providers/all/${projectId}`);
  }

  submitProviders(provider: IProvider): Observable<IProvider> {
    return this.http.post<IProvider>(
      `${environment.baseUrl}/api/v1/providers/`,
      provider
    );
  }

  getOneProvider(providerId: string): Observable<IProvider> {
    return this.http.get<IProvider>(`${environment.baseUrl}/api/v1/providers/${providerId}`
    );
  }

  editProvider(
    providerId: string,
    provider: IProvider
  ): Observable<IProvider> {
    return this.http.patch<IProvider>(
      `${environment.baseUrl}/api/v1/providers/${providerId}`,
      provider);
  }

  getProjectsByProvider(providerId: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.baseUrl}/api/v1/providers/projects/${providerId}`
    );
  }

  isOwner(providerId: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${environment.baseUrl}/api/v1/providers/owner/${providerId}`
    );
  }

  async isProviderInProject(providerId: string, projectId: string): Promise<boolean> {
    try {
      const response = await this.http.get<boolean>(
        `${environment.baseUrl}/api/v1/providers/project/${providerId}/${projectId}`
      ).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}
