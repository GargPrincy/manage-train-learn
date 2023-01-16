import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAllComponent } from './slide-all.component';

describe('SlideAllComponent', () => {
  let component: SlideAllComponent;
  let fixture: ComponentFixture<SlideAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
