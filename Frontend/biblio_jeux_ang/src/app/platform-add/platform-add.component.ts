import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, RestService } from '../rest.service';

@Component({
  selector: 'app-platform-add',
  templateUrl: './platform-add.component.html',
  styleUrls: ['./platform-add.component.css']
})
export class PlatformAddComponent implements OnInit {

  platform = {} as Platform;

  constructor(public rest: RestService,private route: ActivatedRoute ,private router: Router) { }

  ngOnInit(): void {
  }

  addPlatform(){
    this.rest.createPlatform(this.platform).subscribe(
      (result) =>{
        this.router.navigate(['/games']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
