import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TheatreService} from './../../service/theatre.service';
import {OrderTicketService} from './../../service/order-ticket.service';
import {Theatre} from './../../models/Theatre';
import {Screen} from './../../models/Screen';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.css']
})
export class BookingTicketComponent implements OnInit {
  theatreDetails: Theatre;
  theatreName: string;
  movieName: string;
  screenDetails: Screen;
  theatreSub: Subscription;
  form: FormGroup;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private theatreService: TheatreService, private orderTicketService: OrderTicketService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl(null),
      ticketNos: new FormControl(null)
    });

    this.route.paramMap
      .subscribe(paramMap=>{
        if(paramMap.has('theatre') && paramMap.has('movie')){
          this.theatreName = paramMap.get('theatre');
          this.movieName = paramMap.get('movie');
          this.theatreSub = this.theatreService.getTheatre(this.theatreName)
            .subscribe(theatre=>{
              this.theatreDetails = theatre[0];
              this.screenDetails = this.theatreDetails.screensDetail.filter(screen => screen.runningMovie == this.movieName);
              this.screenDetails = this.screenDetails[0];
              this.isLoading = false;
            })
        }
      })
  }

  ngOnDestroy(){
    this.theatreSub.unsubscribe();
  }

  onOrderTicket(event){
    console.log(this.form.value);
    let payload = {
      movieName: this.movieName,
      theatreName: this.theatreName,
      email: this.form.value.email,
      noOfSeats: this.form.value.ticketNos
    }

    this.orderTicketService.saveTicket(payload);
  }

}
