import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Theatre} from './../models/Theatre';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private url = "http://localhost:3000/api/theatre/";
  private theatres : Theatre[];
  private theatresUpdated = new Subject<Theatre[]>();
  private theatresAdded: Theatre[] = []
  constructor(private http: HttpClient, private router: Router) { }

  getTheatres(){
    this.http.get<Theatre[]>(this.url)
      .subscribe(
        theatres=>{
          this.theatres = theatres;
          this.theatresUpdated.next([...this.theatres]);
        }
      )
  };

  getTheatresUpdatedListener(){
    return this.theatresUpdated.asObservable();
  }

  getTheatre(name){
    return this.http.get<Theatre>(this.url+ name);
  }

  addTheatre(theatre){
    return this.http.post(this.url, theatre)
      .subscribe(responseData=>{
        this.theatres.push(theatre);
        this.theatresUpdated.next([...this.theatres]);
        this.router.navigate(["/adminHome/listTheatre"]);
      });
  }

  editTheatre(theatre){
    this.http.put(this.url, theatre)
      .subscribe(
        response=>{
          let updatedTheatres = [...this.theatres];
          let oldTheatre = updatedTheatres.findIndex(f => f.name === theatre.name);
          updatedTheatres[oldTheatre]= {
            name: theatre.name,
            noOfScreens: theatre.noOfScreens,
            screensDetail: theatre.screensDetail
          };
          this.theatres = updatedTheatres;
          this.theatresUpdated.next([...this.theatres]);
          this.router.navigate(["/adminHome/listTheatre"]);
        }
      )
  }

  deleteTheatre(deleteTheatre){
    this.http.delete(this.url+ deleteTheatre.name)
      .subscribe(response=>{
        let theatres = this.theatres.filter(theatre=> theatre.name != deleteTheatre.name)
        this.theatres = theatres;
        this.theatresUpdated.next([...this.theatres]);
        this.router.navigate(["/adminHome/listTheatre"]);
      })
  }
}
