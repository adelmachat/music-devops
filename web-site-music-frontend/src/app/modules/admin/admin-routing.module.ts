import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpectacleFormComponent } from './spectacle-form/spectacle-form.component';
import { EpisodeFormComponent } from './episode-form/episode-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'spectacle/new', component: SpectacleFormComponent },
  { path: 'spectacle/edit/:id', component: SpectacleFormComponent },
  { path: 'episode/new', component: EpisodeFormComponent },
  { path: 'episode/edit/:id', component: EpisodeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}