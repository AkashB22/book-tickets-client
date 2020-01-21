import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl} from '@angular/forms';
import {TheatreService} from './../../../service/theatre.service'

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder : FormBuilder, private theatreService: TheatreService) { }

  get screensDetail(){
    return this.form.get('screensDetail') as FormArray;
  }

  createScreensDetail(){
    return this.formBuilder.group({
      runningMovie: new FormControl(null),
      totalSeats: new FormControl(null),
      availableSeats: new FormControl(null),
      bookedSeats: new FormControl(null)
    });
  }

  addScreensDetail(){
    this.screensDetail.push(this.formBuilder.group({
      runningMovie: new FormControl(null),
      totalSeats: new FormControl(null),
      availableSeats: new FormControl(null),
      bookedSeats: new FormControl(null)
    }))
  }

  deleteScreensDetail(){
    (this.form.controls['screensDetail'] as FormArray).clear();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      noOfScreens: 1,
      screensDetail: this.formBuilder.array([this.createScreensDetail()])
    });
  }

  onChangeOfScreens(){
    if(this.form.value.noOfScreens > 1){
      this.deleteScreensDetail();
      for(let i=0; i<this.form.value.noOfScreens; i++){
        this.addScreensDetail();
        console.log(this.form.controls['screensDetail'].value);
      }
    }
  }

  onAddTheatre(event){
    console.log(this.form.value);
    this.theatreService.addTheatre(this.form.value);
  }
}
