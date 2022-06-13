import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, RestService } from '../rest.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  category = {} as Category;
  
  constructor(public rest: RestService,private route: ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
  }

  addCategory(){
    this.rest.createCategory(this.category).subscribe(
      (result) =>{
        this.router.navigate(['/games']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
