import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Game, Platform, RestService } from '../rest.service';
import { SharedService  } from '../shared.service';
import { Subscription } from 'rxjs';


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
  showAll = true;

  platform = {} as Platform;
  platformE = {} as Platform;
  platforms: Platform[] = [];
  showPlatformEdit = false;
  showPlatformAdd = false;

  category = {} as Category;
  categoryE = {} as Category;
  categories: Category[] = [];
  showCategoryEdit = false;
  showCategoryAdd = false;

  clickEventSubscription!: Subscription;

  constructor(public rest: RestService,private route: ActivatedRoute ,private router: Router, private sharedService:SharedService) { 
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(()=>{this.showCategoryAddForm() })
  }

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
  showAllGames(){
    this.showAll = true;
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
    this.showAll = false;
    this.platformGames = platform.games;
    this.findGameByCatPlat();
  }
  showPlatformEditForm(platformE: Platform){
    this.showPlatformEdit = !this.showPlatformEdit;
    this.platformE = platformE
    if(this.showPlatformAdd == true){
      this.showPlatformAdd = false;
    }
  }
  showPlatformAddForm(){
    this.showPlatformAdd = !this.showPlatformAdd;
    if(this.showPlatformEdit == true){
      this.showPlatformEdit = false;
    }
  }
  deletePlatform(id:number){
    this.rest.deletePlatform(id).subscribe();
    this.platforms = this.platforms.filter((platform: Platform) => platform.platform_id !== id); 
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
    this.showAll = false;
    this.categoryGames = category.games;
    this.findGameByCatPlat();
  }
  showCategoryEditForm(categoryE: Category){
    this.showCategoryEdit = !this.showCategoryEdit;
    this.categoryE = categoryE
    if(this.showCategoryAdd == true){
      this.showCategoryAdd = false;
    }
  }
  showCategoryAddForm(){
    this.showCategoryAdd = !this.showCategoryAdd;
    if(this.showCategoryEdit == true){
      this.showCategoryEdit = false;
    }
  }
  deleteCategory(id:number){
    this.rest.deleteCategory(id).subscribe();
    this.categories = this.categories.filter((category: Category) => category.category_id !== id); 
  }
}
