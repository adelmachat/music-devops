import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { EpisodeService } from '../../../core/services/episode.service';

@Component({
  selector: 'app-episode-form',
  templateUrl: './episode-form.component.html',
  styleUrls: ['./episode-form.component.scss']
})
export class EpisodeFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isEditMode = false;
  episodeId: number | null = null;
  loading = false;

  afficheFile: File | null = null;
  affichePreview: string | null = null;
  reelFiles: File[] = [];
  existingReels: any[] = [];

  constructor(
    private fb: FormBuilder,
    private episodeService: EpisodeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      numero: ['', Validators.required],
      titre: ['', Validators.required],
      description: [''],
      youtubeUrl: ['', Validators.required],
      datePublication: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.episodeId = +id;
      this.loadEpisode(this.episodeId);
    }
  }

  loadEpisode(id: number): void {
    this.episodeService.getById(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          numero: data.numero,
          titre: data.titre,
          description: data.description,
          youtubeUrl: data.youtubeUrl,
          datePublication: data.datePublication
        });
        this.affichePreview = data.afficheUrl;
        this.existingReels = data.reels;
      },
      error: () => {
        this.snackBar.open('Erreur chargement épisode', 'OK', { duration: 3000 });
      }
    });
  }

  onAfficheSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.afficheFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.affichePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onReelsSelected(event: any): void {
    const newFiles = Array.from(event.target.files) as File[];
    this.reelFiles = [...this.reelFiles, ...newFiles];
    event.target.value = '';
  }

  ngOnDestroy(): void {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const data = this.form.value;

    if (this.isEditMode && this.episodeId) {
      this.episodeService.update(this.episodeId, data).subscribe({
        next: (episode) => this.uploadMedias(episode.id),
        error: () => {
          this.loading = false;
          this.snackBar.open('Erreur modification', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.episodeService.create(data).subscribe({
        next: (episode) => this.uploadMedias(episode.id),
        error: () => {
          this.loading = false;
          this.snackBar.open('Erreur création', 'OK', { duration: 3000 });
        }
      });
    }
  }

  uploadMedias(episodeId: number): void {
    const uploads: Promise<any>[] = [];

    if (this.afficheFile) {
      uploads.push(
        firstValueFrom(this.episodeService.uploadAffiche(episodeId, this.afficheFile))
      );
    }

    this.reelFiles.forEach((file) => {
      uploads.push(
        firstValueFrom(this.episodeService.uploadReel(episodeId, file, file.name))
      );
    });

    Promise.all(uploads).then(() => {
      this.loading = false;
      this.snackBar.open(
        this.isEditMode ? 'Épisode modifié ✅' : 'Épisode créé ✅',
        'OK',
        { duration: 3000 }
      );
      this.router.navigate(['/admin']);
    }).catch(() => {
      this.loading = false;
      this.snackBar.open('Épisode sauvegardé mais erreur upload médias', 'OK', { duration: 4000 });
      this.router.navigate(['/admin']);
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}