import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { SpectacleService } from '../../../core/services/spectacle.service';

@Component({
  selector: 'app-spectacle-form',
  templateUrl: './spectacle-form.component.html',
  styleUrls: ['./spectacle-form.component.scss']
})
export class SpectacleFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isEditMode = false;
  spectacleId: number | null = null;
  loading = false;
  uploadingAffiche = false;
  uploadingPhoto = false;
  uploadingReel = false;

  // Fichiers sélectionnés
  afficheFile: File | null = null;
  affichePreview: string | null = null;
  photoFiles: File[] = [];
  photoPreviews: string[] = [];
  reelFiles: File[] = [];

  // Données existantes en mode edit
  existingPhotos: any[] = [];
  existingReels: any[] = [];

  constructor(
    private fb: FormBuilder,
    private spectacleService: SpectacleService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      date: ['', Validators.required],
      lieu: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.spectacleId = +id;
      this.loadSpectacle(this.spectacleId);
    }
  }

  loadSpectacle(id: number): void {
    this.spectacleService.getById(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          titre: data.titre,
          date: data.date,
          lieu: data.lieu,
          description: data.description
        });
        this.affichePreview = data.afficheUrl;
        this.existingPhotos = data.photos;
        this.existingReels = data.reels;
      },
      error: () => {
        this.snackBar.open('Erreur chargement spectacle', 'OK', { duration: 3000 });
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

  onPhotosSelected(event: any): void {
    const newFiles = Array.from(event.target.files) as File[];
    this.photoFiles = [...this.photoFiles, ...newFiles];
    const newPreviews = newFiles.map(f => URL.createObjectURL(f));
    this.photoPreviews = [...this.photoPreviews, ...newPreviews];
    event.target.value = '';
  }

  onReelsSelected(event: any): void {
    const newFiles = Array.from(event.target.files) as File[];
    this.reelFiles = [...this.reelFiles, ...newFiles];
    event.target.value = '';
  }

  ngOnDestroy(): void {
    this.photoPreviews.forEach(url => URL.revokeObjectURL(url));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const data = this.form.value;

    if (this.isEditMode && this.spectacleId) {
      this.spectacleService.update(this.spectacleId, data).subscribe({
        next: (spectacle) => {
          this.uploadMedias(spectacle.id);
        },
        error: () => {
          this.loading = false;
          this.snackBar.open('Erreur modification', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.spectacleService.create(data).subscribe({
        next: (spectacle) => {
          this.uploadMedias(spectacle.id);
        },
        error: () => {
          this.loading = false;
          this.snackBar.open('Erreur création', 'OK', { duration: 3000 });
        }
      });
    }
  }

  uploadMedias(spectacleId: number): void {
    const uploads: Promise<any>[] = [];

    // Upload affiche
    if (this.afficheFile) {
      uploads.push(
        firstValueFrom(this.spectacleService.uploadAffiche(spectacleId, this.afficheFile))
      );
    }

    // Upload photos
    this.photoFiles.forEach((file, index) => {
      uploads.push(
        firstValueFrom(this.spectacleService.uploadPhoto(spectacleId, file, '', index))
      );
    });

    // Upload reels
    this.reelFiles.forEach((file) => {
      uploads.push(
        firstValueFrom(this.spectacleService.uploadReel(spectacleId, file, file.name))
      );
    });

    Promise.all(uploads).then(() => {
      this.loading = false;
      this.snackBar.open(
        this.isEditMode ? 'Spectacle modifié ✅' : 'Spectacle créé ✅',
        'OK',
        { duration: 3000 }
      );
      this.router.navigate(['/admin']);
    }).catch(() => {
      this.loading = false;
      this.snackBar.open('Spectacle sauvegardé mais erreur upload médias', 'OK', { duration: 4000 });
      this.router.navigate(['/admin']);
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}