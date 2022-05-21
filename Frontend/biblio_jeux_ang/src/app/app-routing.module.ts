import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameAddComponent } from './game-add/game-add.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'game_add',
    component: GameAddComponent
  },
  {
    path: 'game_edit/:game_id',
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
