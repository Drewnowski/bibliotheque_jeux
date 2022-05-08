import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, RestService } from '../rest.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  game = {} as Game;
  games: Game[] = [];

  constructor(public rest: RestService,private route: ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
    this.getGames();
  }

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
    this.getGames();
    //this.router.navigate(['/destinations']);
  }
}
