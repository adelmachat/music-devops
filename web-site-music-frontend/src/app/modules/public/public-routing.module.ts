import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpectaclesComponent } from './spectacles/spectacles.component';
import { SpectacleDetailComponent } from './spectacle-detail/spectacle-detail.component';
import { PodcastComponent } from './podcast/podcast.component';
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spectacles', component: SpectaclesComponent },
  { path: 'spectacles/:id', component: SpectacleDetailComponent },
  { path: 'podcast', component: PodcastComponent },
  { path: 'podcast/:id', component: EpisodeDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}