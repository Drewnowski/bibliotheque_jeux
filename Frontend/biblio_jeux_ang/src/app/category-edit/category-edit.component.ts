import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { GamesComponent } from '../games/games.component';
import { Category, RestService } from '../rest.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  @Input() categoryE = {} as Category;
  category = {} as Category;
  
  constructor(public rest: RestService,private route: ActivatedRoute ,private router: Router, private shareService:SharedService) { }

  ngOnInit(): void {
    this.rest.getCategory(this.categoryE.category_id).subscribe(
      (data)=> {
        console.log(data);
        this.category = data;
      }
    )
  }

  updateCategory() {
    this.rest.updateCategory(this.category).subscribe(
      (result) =>{
        this.shareService.sendClickEvent();
        // this.router.navigate(['/games']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
