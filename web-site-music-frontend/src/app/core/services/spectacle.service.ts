import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spectacle } from '../models/spectacle.model';

@Injectable({
  providedIn: 'root'
})
export class SpectacleService {

  // private publicUrl = 'http://localhost:8080/api/spectacles';
  // private adminUrl = 'http://localhost:8080/api/admin/spectacles';

  private publicUrl = '/api/spectacles';
  private adminUrl = '/api/admin/spectacles';

  constructor(private http: HttpClient) { }

  // Public
  getAll(): Observable<Spectacle[]> {
    return this.http.get<Spectacle[]>(this.publicUrl);
  }

  getById(id: number): Observable<Spectacle> {
    return this.http.get<Spectacle>(`${this.publicUrl}/${id}`);
  }

  // Admin
  create(data: any): Observable<Spectacle> {
    return this.http.post<Spectacle>(this.adminUrl, data);
  }

  update(id: number, data: any): Observable<Spectacle> {
    return this.http.put<Spectacle>(`${this.adminUrl}/${id}`, data);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.adminUrl}/${id}`, { responseType: 'text' });
  }

  uploadAffiche(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.adminUrl}/${id}/affiche`, formData);
  }

  uploadPhoto(id: number, file: File, legende: string, ordre: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('legende', legende);
    formData.append('ordre', ordre.toString());
    return this.http.post(`${this.adminUrl}/${id}/photos`, formData);
  }

  uploadReel(id: number, file: File, titre: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    return this.http.post(`${this.adminUrl}/${id}/reels`, formData);
  }
}