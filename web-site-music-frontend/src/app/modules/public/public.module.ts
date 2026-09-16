import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { SpectaclesComponent } from './spectacles/spectacles.component';
import { SpectacleDetailComponent } from './spectacle-detail/spectacle-detail.component';
import { PodcastComponent } from './podcast/podcast.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    HomeComponent,
    SpectaclesComponent,
    SpectacleDetailComponent,
    PodcastComponent,
    EpisodeDetailComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ]
})
export class PublicModule {}