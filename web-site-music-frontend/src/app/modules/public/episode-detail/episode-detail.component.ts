import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../core/models/episode.model';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss']
})
export class EpisodeDetailComponent implements OnInit {

  episode: Episode | null = null;
  loading = true;
  safeYoutubeUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private episodeService: EpisodeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.episodeService.getById(+id).subscribe({
        next: (data) => {
          this.episode = data;
          if (data.youtubeUrl) {
            this.safeYoutubeUrl = this.buildYoutubeEmbed(data.youtubeUrl);
          }
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

  buildYoutubeEmbed(url: string): SafeResourceUrl {
    const videoId = url.includes('v=')
      ? url.split('v=')[1].split('&')[0]
      : url.split('/').pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  goBack(): void {
    this.router.navigate(['/podcast']);
  }
}