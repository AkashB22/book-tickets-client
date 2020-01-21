import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderTicketService {
  private url = "http://localhost:3000/api/orderTicket";
  constructor(private http: HttpClient, private router: Router) { }

  getOrderTickets(){
    return this.http.get(this.url);
  }

  saveTicket(ticket){
    this.http.post(this.url, ticket)
      .subscribe(responseData=>{
        console.log(responseData);
        this.router.navigate(['/Home']);
      });
  }
}
