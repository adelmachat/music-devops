import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpectacleService } from '../../../core/services/spectacle.service';
import { Spectacle } from '../../../core/models/spectacle.model';

@Component({
  selector: 'app-spectacles',
  templateUrl: './spectacles.component.html',
  styleUrls: ['./spectacles.component.scss']
})
export class SpectaclesComponent implements OnInit {

  spectacles: Spectacle[] = [];
  loading = true;

  constructor(
    private spectacleService: SpectacleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spectacleService.getAll().subscribe({
      next: (data) => {
        this.spectacles = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/spectacles', id]);
  }
}