import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { SpectacleService } from '../../../core/services/spectacle.service';
import { EpisodeService } from '../../../core/services/episode.service';
import { Spectacle } from '../../../core/models/spectacle.model';
import { Episode } from '../../../core/models/episode.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  spectacles: Spectacle[] = [];
  episodes: Episode[] = [];
  loadingSpectacles = false;
  loadingEpisodes = false;
  adminEmail = '';
  activeTab: 'spectacles' | 'episodes' = 'spectacles';

  get totalPhotos(): number {
    return this.spectacles.reduce((acc, s) => acc + (s.photos?.length || 0), 0);
  }

  get totalReels(): number {
    const fromSpectacles = this.spectacles.reduce((acc, s) => acc + (s.reels?.length || 0), 0);
    const fromEpisodes = this.episodes.reduce((acc, e) => acc + (e.reels?.length || 0), 0);
    return fromSpectacles + fromEpisodes;
  }

  constructor(
    private authService: AuthService,
    private spectacleService: SpectacleService,
    private episodeService: EpisodeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminEmail = this.authService.getEmail();
    this.loadSpectacles();
    this.loadEpisodes();
  }

  getInitials(): string {
    const email = this.adminEmail;
    if (!email) return 'A';
    return email.substring(0, 2).toUpperCase();
  }

  loadSpectacles(): void {
    this.loadingSpectacles = true;
    this.spectacleService.getAll().subscribe({
      next: (data) => { this.spectacles = data; this.loadingSpectacles = false; },
      error: () => {
        this.loadingSpectacles = false;
        this.snackBar.open('Erreur chargement spectacles', 'OK', { duration: 3000 });
      }
    });
  }

  loadEpisodes(): void {
    this.loadingEpisodes = true;
    this.episodeService.getAll().subscribe({
      next: (data) => { this.episodes = data; this.loadingEpisodes = false; },
      error: () => {
        this.loadingEpisodes = false;
        this.snackBar.open('Erreur chargement episodes', 'OK', { duration: 3000 });
      }
    });
  }

  deleteSpectacle(id: number): void {
    if (confirm('Supprimer ce spectacle ?')) {
      this.spectacleService.delete(id).subscribe({
        next: () => { this.snackBar.open('Spectacle supprimé', 'OK', { duration: 3000 }); this.loadSpectacles(); },
        error: () => this.snackBar.open('Erreur suppression', 'OK', { duration: 3000 })
      });
    }
  }

  deleteEpisode(id: number): void {
    if (confirm('Supprimer cet épisode ?')) {
      this.episodeService.delete(id).subscribe({
        next: () => { this.snackBar.open('Episode supprimé', 'OK', { duration: 3000 }); this.loadEpisodes(); },
        error: () => this.snackBar.open('Erreur suppression', 'OK', { duration: 3000 })
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
