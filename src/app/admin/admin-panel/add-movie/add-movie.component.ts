import { Component, OnInit } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {MovieService} from './../../../service/movie.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Movies} from './../../../models/Movies';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movies: Movies[];
  form: FormGroup;
  moviesSubs: Subscription;
  
  constructor(private movieService: MovieService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ''
    });

    this.movieService.getMovies();
    this.moviesSubs = this.movieService.getMoviesUpdated().subscribe(movies=>{
        this.movies = movies;
    });
  }

  ngOnDestroy(){
    this.moviesSubs.unsubscribe();
  }

  addNewMovie(event){
    console.log(this.form.value);
    this.movieService.addMovie(this.form.value);
    this.form.reset();
  }
}
