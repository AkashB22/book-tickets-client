import { Component, OnInit } from '@angular/core';
import {Theatre} from './../../../models/Theatre';
import {TheatreService} from './../../../service/theatre.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit {
  theatres: Theatre[];
  theatresSub: Subscription;
  theatreName: string= null;

  constructor(private theatreService: TheatreService, private router: Router) { }

  ngOnInit() {
    this.theatreService.getTheatres();
    this.theatresSub = this.theatreService.getTheatresUpdatedListener()
      .subscribe(theatres=>{
        this.theatres = theatres;
      })
  }

  ngOnDestroy(){
    this.theatresSub.unsubscribe();
  }

  onTheatre(theatreNameOnClick){
    if(this.theatreName== theatreNameOnClick){
      this.theatreName = null;
    } else{
      this.theatreName = theatreNameOnClick;
    }
  }

  onBookingTicket(theatre, movie){
    this.router.navigate(['/Home/bookingTicket', theatre, movie]);
  }
}
