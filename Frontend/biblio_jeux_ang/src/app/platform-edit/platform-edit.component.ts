import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, RestService } from '../rest.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-platform-edit',
  templateUrl: './platform-edit.component.html',
  styleUrls: ['./platform-edit.component.css']
})
export class PlatformEditComponent implements OnInit {

  @Input() platformE = {} as Platform;
  platform = {} as Platform

  constructor(public rest: RestService,private route: ActivatedRoute ,private router: Router, private shareService:SharedService) { }

  ngOnInit(): void {
    this.rest.getPlatform(this.platformE.platform_id).subscribe(
      (data)=> {
        console.log(data);
        this.platform = data;
      }
    )
  }

  updatePlatform() {
    this.rest.updatePlatform(this.platform).subscribe(
      (result) =>{
        // this.shareService.sendClickEvent();
         this.router.navigate(['/games']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
