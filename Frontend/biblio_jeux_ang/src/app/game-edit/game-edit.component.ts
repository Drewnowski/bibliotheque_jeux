import { Component, OnInit } from '@angular/core';
import { RestService, Game, Platform, Category } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  game = {} as Game;
  platform = {} as Platform;
  filtred_platforms: Platform[] = [];

  category = {} as Category;
  filtred_categories: Category[] = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rest.getGame(this.route.snapshot.params['game_id']).subscribe(
      (data)=> {
        console.log(data);
        this.game = data;
      }
    )
  }

  updateGame() {

    this.rest.updateGame(this.game).subscribe(
      (result)=> {
        this.router.navigate(['/games']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  
  getFiltredCategory(){
    this.rest.getFiltredCategory((<HTMLInputElement>document.getElementById("categorytofind")).value).subscribe(
      resp => (
        console.log(resp),
        this.filtred_categories = resp
    )
    );
  }

  getFiltredPlatforms(){
    this.rest.getFiltredPlatforms((<HTMLInputElement>document.getElementById("platformtofind")).value).subscribe(
      resp => (
        console.log(resp),
        this.filtred_platforms = resp
    )
    );
  }
  deleteCategoryFromGame(id:number){
    this.game.categories = this.game.categories.filter((category: Category) => category.category_id !== id);
  }
  deletePlatformFromGame(id:number){
    this.game.platforms = this.game.platforms.filter((platform: Platform) => platform.platform_id !== id);
  }
  
  updateCategoryToAdd(category: Category){
    var index = this.game.categories.findIndex(x => x.name == category.name);
    index === -1 ? this.game.categories.push(category) : console.log("this category already exists")
  }
  updatePlatformToAdd(platform: Platform){
    var index = this.game.platforms.findIndex(x => x.name == platform.name);
    index === -1 ? this.game.platforms.push(platform) : console.log("this category already exists")
  }
  gameAddCategory(){
    this.rest.gameAddCategory(this.game.game_id,this.category).subscribe();
  }
  gameAddPlatform(){
    this.rest.gameAddPlatform(this.game.game_id,this.platform).subscribe();
  }

  cancelEdit() {
    this.router.navigate(['/games']);
  }

}

