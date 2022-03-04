import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchedComponent } from './location-searched.component';

describe('LocationSearchedComponent', () => {
  let component: LocationSearchedComponent;
  let fixture: ComponentFixture<LocationSearchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationSearchedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
