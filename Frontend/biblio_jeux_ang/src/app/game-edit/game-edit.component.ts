import { Component, OnInit } from '@angular/core';
import { RestService, Game } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  game = {} as Game;

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
      (result) =>{
        this.router.navigate(['/games']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  cancelEdit() {
    this.router.navigate(['/games']);
  }
}
