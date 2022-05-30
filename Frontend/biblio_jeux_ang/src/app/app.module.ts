import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameAddComponent } from './game-add/game-add.component';
import { PlatformAddComponent } from './platform-add/platform-add.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { PlatformEditComponent } from './platform-edit/platform-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameEditComponent,
    GameAddComponent,
    PlatformAddComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    PlatformEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
