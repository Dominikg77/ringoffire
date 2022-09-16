import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNumberPlayerComponent } from './alert-number-player.component';

describe('AlertNumberPlayerComponent', () => {
  let component: AlertNumberPlayerComponent;
  let fixture: ComponentFixture<AlertNumberPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertNumberPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertNumberPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
