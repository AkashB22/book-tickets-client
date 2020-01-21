import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movies} from './../models/Movies';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = "http://localhost:3000/api/movie/";
  movies: Movies[];
  moviesUpdated = new Subject<Movies[]>();
  moviesDetail: any[];
  moviesDetailUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getMovies(){
    this.http.get<Movies[]>(this.url).subscribe(response=>{
      this.movies = response;
      this.moviesUpdated.next([...this.movies]);
    })
  }

  getMoviesUpdated(){
    return this.moviesUpdated.asObservable();
  }

  saveMovie(movie){
    return this.http.post(this.url, movie);
  }

  addMovie(movie){
    this.http.post(this.url, movie)
      .subscribe(responseData=>{
        this.movies.push(movie);
        this.moviesUpdated.next([...this.movies]);
      })
  }

  getTheatreOfAParticularMovie(){
    this.http.get<any[]>(this.url + 'threateRunningMovie/')
      .subscribe((responseData)=>{
        this.moviesDetail = responseData;
        this.moviesDetailUpdated.next([...this.moviesDetail]);
      });
  }

  getTheatreOfAParticularMovieUpdatedListener(){
    return this.moviesDetailUpdated.asObservable();
  }
}
