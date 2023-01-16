import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideListingsComponent } from './slide-listings.component';

describe('SlideListingsComponent', () => {
  let component: SlideListingsComponent;
  let fixture: ComponentFixture<SlideListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideListingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
