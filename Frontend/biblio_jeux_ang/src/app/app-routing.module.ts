import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'game-edit/:games_id',
    component: GameEditComponent
  },
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
