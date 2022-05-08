import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, RestService } from '../rest.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {

  game = {} as Game;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  addGame(){
    this.rest. createGame(this.game).subscribe(
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
