import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTheatreComponent } from './admin/admin-panel/add-theatre/add-theatre.component';
import { ListTheatreComponent } from './admin/admin-panel/list-theatre/list-theatre.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { EditTheatreComponent } from './admin/admin-panel/edit-theatre/edit-theatre.component';
import { AddMovieComponent } from './admin/admin-panel/add-movie/add-movie.component';
import { ListMovieComponent } from './admin/admin-panel/list-movie/list-movie.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { MoviesComponent } from './main/home/movies/movies.component';
import { TheatresComponent } from './main/home/theatres/theatres.component';
import { BookingTicketComponent } from './main/booking-ticket/booking-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTheatreComponent,
    ListTheatreComponent,
    AdminPanelComponent,
    EditTheatreComponent,
    AddMovieComponent,
    ListMovieComponent,
    MainComponent,
    HomeComponent,
    MoviesComponent,
    TheatresComponent,
    BookingTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
