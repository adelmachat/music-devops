import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  // private publicUrl = 'http://localhost:8080/api/episodes';
  // private adminUrl = 'http://localhost:8080/api/admin/episodes';

  private publicUrl = '/api/episodes';
  private adminUrl = '/api/admin/episodes';

  constructor(private http: HttpClient) { }

  // Public
  getAll(): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.publicUrl);
  }

  getById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.publicUrl}/${id}`);
  }

  // Admin
  create(data: any): Observable<Episode> {
    return this.http.post<Episode>(this.adminUrl, data);
  }

  update(id: number, data: any): Observable<Episode> {
    return this.http.put<Episode>(`${this.adminUrl}/${id}`, data);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.adminUrl}/${id}`, { responseType: 'text' });
  }

  uploadAffiche(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.adminUrl}/${id}/affiche`, formData);
  }

  uploadReel(id: number, file: File, titre: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    return this.http.post(`${this.adminUrl}/${id}/reels`, formData);
  }
}