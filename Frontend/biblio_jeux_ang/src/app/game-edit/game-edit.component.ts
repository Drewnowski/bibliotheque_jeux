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
  platform_to_change: Platform[] = [];
  filtred_platforms: Platform[] = [];

  category = {} as Category;
  category_to_change: Category[] = [];
  filtred_categories: Category[] = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rest.getGame(this.route.snapshot.params['game_id']).subscribe(
      (data)=> {
        console.log(data);
        this.game = data;

        data["categories"].forEach((cat: Category)=>{
          this.category_to_change.push(cat)
        })

        data["platforms"].forEach((plat: Platform)=>{
          this.platform_to_change.push(plat)
        })

        
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
  updateCategoryToRemove(id:number){
    this.category_to_change = this.category_to_change.filter((category: Category) => category.category_id !== id);
  }
  updatePlatformsToRemove(id:number){
    this.platform_to_change = this.platform_to_change.filter((platform: Platform) => platform.platform_id !== id);
  }
  
  updateCategoryToAdd(category: Category){
    var index = this.category_to_change.findIndex(indexToAdd => indexToAdd.name == category.name);
    index === -1 ? this.category_to_change.push(category) : console.log("this category already exists")
  }
  updatePlatformsToAdd(platform: Platform){
    var index = this.platform_to_change.findIndex(x => x.name == platform.name);
    index === -1 ? this.platform_to_change.push(platform) : console.log("this category already exists")
  }

  gameAddCategory(category:Category){
    this.rest.gameAddCategory(this.game.game_id,category).subscribe();
  }
  gameAddPlatform(platform:Platform){
    this.rest.gameAddPlatform(this.game.game_id,this.platform).subscribe();
  }

  gameRemoveCategory(category_to_r:Category){
    this.rest.gameRemoveCategory(this.game.game_id,category_to_r).subscribe();
  }
  gameRemovePlatform(platform: Platform){
    this.rest.gameRemovePlatform(this.game.game_id,this.platform).subscribe();
  }

  cancelEdit() {
    this.router.navigate(['/games']);
  }

  test(){
    this.category_to_change.forEach((category_to_change) => {
      var index = this.game.categories.findIndex(x => x.category_id == category_to_change.category_id);
      index === -1 ? this.gameAddCategory(category_to_change) : console.log("this category already exists")
    })

    this.game.categories.forEach((category) => {
      var index = this.category_to_change.findIndex(xx => xx.category_id == category.category_id);
      index === -1 ? this.gameRemoveCategory(category) : console.log("this category already exists")
    })
    //Update platforms list
    this.platform_to_change.forEach((platform_to_ch) => {
      var index = this.game.platforms.findIndex(x => x.platform_id == platform_to_ch.platform_id);
      index === -1 ? this.gameAddPlatform(platform_to_ch) : console.log("this category already exists")
    })

    this.game.platforms.forEach((platform) => {
      var index = this.platform_to_change.findIndex(xx => xx.platform_id == platform.platform_id);
      index === -1 ? this.gameRemovePlatform(platform) : console.log("this category already exists")
    })
  }
}

