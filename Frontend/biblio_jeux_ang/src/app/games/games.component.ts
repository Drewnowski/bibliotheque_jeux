import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Game, Platform, RestService } from '../rest.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  game = {} as Game;
  games: Game[] = [];
  filtredGames: Game[] = [];
  platformGames: Game[] = [];
  categoryGames: Game[] = [];
  catPlatGames: Game[] = [];

  platform = {} as Platform;
  platforms: Platform[] = [];

  category = {} as Category;
  categories: Category[] = [];

  constructor(public rest: RestService,private route: ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
    this.getGames();
    this.getPlatforms();
    this.getCategories();
  }

  //===========Games===============
  getGames(){
    this.rest.getGames().subscribe(
      resp => (
        console.log(resp),
        this.games = resp
    )
    );
  }
  add(){
    this.router.navigate(['/game_add']);
  }

  deleteGame(id: number){
    this.rest.deleteGame(id).subscribe();
    this.games = this.games.filter((game: Game) => game.game_id !== id); 
  }

  findGameByName(){//nametofind: string
    this.filtredGames = this.games.filter((game: Game) => game.name === (<HTMLInputElement>document.getElementById("valuetofind")).value);
  }

  findGameByCatPlat(){
    if (this.platformGames != [] && this.categoryGames != []){
      this.catPlatGames = this.platformGames.filter((a: Game) => this.categoryGames.some((b: Game) => a.game_id === b.game_id));
    }
  }

  //==========Platforms================
  getPlatforms(){
    this.rest.getPlatforms().subscribe(
      resp => (
        console.log(resp),
        this.platforms = resp
    )
    );
  }

  getplatformGames(platform: Platform){
    this.platformGames = platform.games;
    this.findGameByCatPlat();
  }

  //==========Categories===============
  getCategories(){
    this.rest.getCategories().subscribe(
      resp => (
        console.log(resp),
        this.categories = resp
    )
    );
  }
  getCategoryGames(category: Category){
    this.categoryGames = category.games;
    this.findGameByCatPlat();
  }


}
