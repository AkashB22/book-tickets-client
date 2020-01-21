import { Component, OnInit } from '@angular/core';
import {MovieService} from './../../../service/movie.service';
import {Movies} from './../../../models/Movies';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movies[];
  moviesSub: Subscription;
  movieName: string= null

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.movieService.getTheatreOfAParticularMovie();
    this.moviesSub = this.movieService.getTheatreOfAParticularMovieUpdatedListener()
      .subscribe(
      (moviesDetails)=>{
        this.movies = moviesDetails;
        console.log(this.movies);
      });
  }

  ngOnDestroy(){
    this.moviesSub.unsubscribe();
  }

  onMovie(movieNameOnClick){
    if(this.movieName === movieNameOnClick){
      this.movieName = null;
    } else{
      this.movieName = movieNameOnClick;
    }
  }

  onBookingTicket(theatre, movie){
    this.router.navigate(['/Home/bookingTicket', theatre, movie]);
  }
}
