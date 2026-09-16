import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpectacleService } from '../../../core/services/spectacle.service';
import { Spectacle } from '../../../core/models/spectacle.model';

@Component({
  selector: 'app-spectacle-detail',
  templateUrl: './spectacle-detail.component.html',
  styleUrls: ['./spectacle-detail.component.scss']
})
export class SpectacleDetailComponent implements OnInit {

  spectacle: Spectacle | null = null;
  loading = true;
  selectedPhoto: string | null = null;
  lightboxIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spectacleService: SpectacleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spectacleService.getById(+id).subscribe({
        next: (data) => {
          this.spectacle = data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

  openLightbox(index: number): void {
    if (!this.spectacle?.photos?.length) return;
    this.lightboxIndex = index;
    this.selectedPhoto = this.spectacle.photos[index].url;
  }

  navLightbox(dir: number): void {
    if (!this.spectacle?.photos?.length) return;
    const total = this.spectacle.photos.length;
    this.lightboxIndex = ((this.lightboxIndex + dir) + total) % total;
    this.selectedPhoto = this.spectacle.photos[this.lightboxIndex].url;
  }

  openPhoto(url: string): void {
    this.selectedPhoto = url;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }

  getGalleryClass(index: number): string {
    const patterns = ['gallery__item--lg', '', '', 'gallery__item--w', '', 'gallery__item--t', '', 'gallery__item--w', '', '', 'gallery__item--lg', ''];
    return patterns[index % patterns.length] || '';
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (this.selectedPhoto === null) return;
    if (e.key === 'Escape') this.closePhoto();
    if (e.key === 'ArrowLeft') this.navLightbox(-1);
    if (e.key === 'ArrowRight') this.navLightbox(1);
  }

  goBack(): void {
    this.router.navigate(['/spectacles']);
  }
}
