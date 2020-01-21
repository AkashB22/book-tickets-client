import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {ListTheatreComponent} from './admin/admin-panel/list-theatre/list-theatre.component';
import {AddTheatreComponent} from './admin/admin-panel/add-theatre/add-theatre.component';
import {EditTheatreComponent} from './admin/admin-panel/edit-theatre/edit-theatre.component';
import {ListMovieComponent} from './admin/admin-panel/list-movie/list-movie.component';
import {AddMovieComponent} from './admin/admin-panel/add-movie/add-movie.component';
import {MainComponent} from './main/main.component';
import {BookingTicketComponent} from './main/booking-ticket/booking-ticket.component';
import {HomeComponent} from './main/home/home.component';

const routes: Routes = [
  {path: '', redirectTo:'adminHome', pathMatch: 'full'},
  {path: 'adminHome', component: AdminPanelComponent, children: [
    {path: 'listTheatre', component: ListTheatreComponent},
    {path: 'addTheatre', component: AddTheatreComponent},
    {path: 'editTheatre/:name', component: EditTheatreComponent},
    {path: 'listMovie', component: ListMovieComponent},
    {path: 'addMovie', component: AddMovieComponent},
  ]},
  {path: 'Home', component: MainComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'bookingTicket/:theatre/:movie', component: BookingTicketComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
