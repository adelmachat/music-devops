import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../core/models/episode.model';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnInit {

  episodes: Episode[] = [];
  loading = true;

  constructor(
    private episodeService: EpisodeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.episodeService.getAll().subscribe({
      next: (data) => {
        this.episodes = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getThumbClass(index: number): string {
    const classes = ['ep-row__thumb--alt', 'ep-row__thumb--alt2', 'ep-row__thumb--alt3', ''];
    return classes[index % classes.length];
  }

  getNoteMark(index: number): string {
    const marks = ['♫', '♬', '𝄞', '♪', '♩'];
    return marks[index % marks.length];
  }

  goToDetail(id: number): void {
    this.router.navigate(['/podcast', id]);
  }
}
