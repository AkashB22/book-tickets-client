import { Component, OnInit } from '@angular/core';
import {TheatreService} from './../../../service/theatre.service';
import {Theatre} from './../../../models/Theatre';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-theatre',
  templateUrl: './list-theatre.component.html',
  styleUrls: ['./list-theatre.component.css']
})
export class ListTheatreComponent implements OnInit {
  theatres: Theatre[];
  private theatresSub : Subscription;
  constructor(private theatreService: TheatreService) { }

  ngOnInit() {
    this.theatreService.getTheatres();
    this.theatresSub = this.theatreService.getTheatresUpdatedListener()
      .subscribe(
        (data)=>{
          this.theatres = data;
        });
  }

  ngOnDestroy(){
    this.theatresSub.unsubscribe();
  }
}
