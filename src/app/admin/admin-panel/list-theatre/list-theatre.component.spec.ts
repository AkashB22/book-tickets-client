import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTheatreComponent } from './list-theatre.component';

describe('ListTheatreComponent', () => {
  let component: ListTheatreComponent;
  let fixture: ComponentFixture<ListTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
