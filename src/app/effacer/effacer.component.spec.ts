import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffacerComponent } from './effacer.component';

describe('EffacerComponent', () => {
  let component: EffacerComponent;
  let fixture: ComponentFixture<EffacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffacerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
