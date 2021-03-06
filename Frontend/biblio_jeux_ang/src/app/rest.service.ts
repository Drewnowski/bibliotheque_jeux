import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError,map } from 'rxjs';

const endpoint = "http://localhost:8000/";

//Interface game
export interface Game{
  game_id: number;
  name: string;
  description: string;
  cost: number;
  memory: number;
  platforms: Platform[];
  categories: Category[];

}

//Interface category
export interface Category{
  category_id: number;
  name: string;
  description: string;
  games: Game[];
}

//Interface platforms
export interface Platform{
  platform_id: number;
  name: string;
  description: string;
  games: Game[];
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }


  // http methods of games
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(endpoint + 'games');
  }
  createGame(game:Game): Observable<any> {
    console.log(game);
    return this.http.post<Game>(endpoint + 'game', game);
  }
  updateGame(game:Game): Observable<any> {
    return this.http.put<Game>(endpoint + 'game/' + game.game_id, game);
  }
  deleteGame(id: number): Observable<any> {
    return this.http.delete<Game>('http://localhost:8000/game/' + id);
      // endpoint + 'game/' + id);
  }
  getGame(id: number): Observable<any> {
    return this.http.get<Game>(endpoint + 'game/find/' + id);
  }
  gameAddCategory(id:number, category: Category): Observable<any> {
    return this.http.post<Category>(endpoint + 'game/addCategory/' + id, category);
  }
  gameAddPlatform(id:number, platform: Platform): Observable<any> {
    return this.http.post<Category>(endpoint + 'game/addPlatform/' + id, platform);
  }
  gameRemoveCategory(id:number, category: Category): Observable<any> {
    return this.http.post<Category>(endpoint + 'game/removeCategory/' + id, category);
  }
  gameRemovePlatform(id:number, platform: Platform): Observable<any> {
    return this.http.post<Category>(endpoint + 'game/removePlatform/' + id, platform);
  }

  
  // http methods of categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(endpoint + 'categories');
  }
  createCategory(category:Category): Observable<any> {
    console.log(category);
    return this.http.post<Category>(endpoint + 'category', category);
  }
  updateCategory(category:Category): Observable<any> {
    return this.http.put<Category>(endpoint + 'category/' + category.category_id, category);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<Category>(endpoint + 'category/' + id);
  }
  getCategory(id: number): Observable<any> {
    return this.http.get<Category>(endpoint + "category/find/"+ id);
  }
  getFiltredCategory(name: string): Observable<any> {
    return this.http.get<Category[]>(endpoint + "category/filter/"+ name);
  }

  // http methods of platforms
  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(endpoint + 'platforms');
  }
  createPlatform(platform:Platform): Observable<any> {
    console.log(platform);
    return this.http.post<Platform>(endpoint + 'platform', platform);
  }
  updatePlatform(platform:Platform): Observable<any> {
    return this.http.put<Platform>(endpoint + 'platform/' + platform.platform_id, platform);
  }
  deletePlatform(id: number): Observable<any> {
    return this.http.delete<Platform>(endpoint + 'platform/' + id);
  }
  getPlatform(id: number): Observable<any> {
    return this.http.get<Platform>(endpoint + "platform/find/"+ id);
  }
  getFiltredPlatforms(name: string): Observable<any> {
    return this.http.get<Platform[]>(endpoint + "platform/filter/"+ name);
  }
  
}
