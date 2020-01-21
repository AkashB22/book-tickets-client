import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl} from '@angular/forms';
import {Theatre} from './../../../models/Theatre';
import {TheatreService} from './../../../service/theatre.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-theatre',
  templateUrl: './edit-theatre.component.html',
  styleUrls: ['./edit-theatre.component.css']
})
export class EditTheatreComponent implements OnInit {
  theatre : Theatre;
  form: FormGroup;
  isLoading = false;
  private mode = "create";
  private theatreName: string;
  private counter: Number = 0;

  get screensDetail(){
    return this.form.get('screensDetail') as FormArray;
  }

  createScreens(){
    return this.formBuilder.group({
      runningMovie: '',
      totalSeats: '',
      availableSeats: '',
      bookedSeats: ''
    })
  }

  addScreensDetail(screenDetail){
    this.screensDetail.push(this.formBuilder.group({
      runningMovie: new FormControl(screenDetail.runningMovie),
      totalSeats: new FormControl(screenDetail.totalSeats),
      availableSeats: new FormControl(screenDetail.availableSeats),
      bookedSeats: new FormControl(screenDetail.bookedSeats)
    }))
  }

  constructor(private route: ActivatedRoute, private theatreService: TheatreService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name : '',
      noOfScreens: '',
      screensDetail: this.formBuilder.array([])
    });

    this.route.paramMap.subscribe(
      (paramMap)=>{
        if(paramMap.has("name")){
          this.mode = "edit";
          this.theatreName = paramMap.get("name");
          this.isLoading = true;
          this.theatreService.getTheatre(this.theatreName)
            .subscribe(
              (theatreData)=>{
                this.isLoading = false;
                this.theatre = theatreData[0];
                this.form.patchValue({
                  name: this.theatre.name,
                  noOfScreens: this.theatre.noOfScreens,
                  screensDetail: [],
                });
                this.theatre['screensDetail'].forEach(screenDetail=>{
                  this.addScreensDetail(screenDetail);
                })
              });
        } else{
          this.mode = "create";
        }
      }
    )
  }

  onEditTheatre(form){
    console.log(this.form.value);
    this.theatreService.editTheatre(this.form.value);
  }

  onDeleteTheatre(form){
    console.log(this.form.value);
    this.theatreService.deleteTheatre(this.form.value);
  }
}
