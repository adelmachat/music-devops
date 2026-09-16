import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SpectacleService } from '../../../core/services/spectacle.service';
import { EpisodeService } from '../../../core/services/episode.service';
import { Spectacle } from '../../../core/models/spectacle.model';
import { Episode } from '../../../core/models/episode.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  latestSpectacles: Spectacle[] = [];
  latestEpisodes: Episode[] = [];

  @ViewChild('notesLayer') notesLayerRef!: ElementRef;

  constructor(
    private spectacleService: SpectacleService,
    private episodeService: EpisodeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spectacleService.getAll().subscribe({
      next: (data) => this.latestSpectacles = data.slice(0, 3)
    });
    this.episodeService.getAll().subscribe({
      next: (data) => this.latestEpisodes = data.slice(0, 3)
    });
  }

  ngAfterViewInit(): void {
    this.initFloatingNotes();
  }

  private initFloatingNotes(): void {
    const notes = ['♩', '♪', '♫', '♬', '𝄞'];
    const layer = this.notesLayerRef?.nativeElement;
    if (!layer) return;
    const positions = [
      { x: 8,  y: 18, size: 56, delay: 0, color: 'var(--terra)' },
      { x: 86, y: 70, size: 44, delay: 4, color: 'var(--ochre-deep)' },
      { x: 92, y: 12, size: 36, delay: 2, color: 'var(--terra-deep)' },
      { x: 14, y: 78, size: 64, delay: 6, color: 'var(--ochre-deep)' },
      { x: 58, y: 8,  size: 28, delay: 8, color: 'var(--terra)' },
      { x: 72, y: 90, size: 32, delay: 3, color: 'var(--terra-deep)' },
      { x: 4,  y: 50, size: 40, delay: 5, color: 'var(--ochre-deep)' },
    ];
    positions.forEach((p, i) => {
      const el = document.createElement('div');
      el.className = 'note-float';
      el.textContent = notes[i % notes.length];
      el.style.left = p.x + '%';
      el.style.top = p.y + '%';
      el.style.fontSize = p.size + 'px';
      el.style.color = p.color;
      el.style.animationDelay = (-p.delay) + 's';
      layer.appendChild(el);
    });
  }

  getCoverClass(index: number): string {
    return 'cover--' + ((index % 3) + 1);
  }

  getThumbClass(index: number): string {
    const classes = ['', 'pod-row__thumb--alt', 'pod-row__thumb--alt2'];
    return classes[index % 3];
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}
