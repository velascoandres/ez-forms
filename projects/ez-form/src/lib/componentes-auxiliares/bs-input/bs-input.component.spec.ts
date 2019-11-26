import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsInputComponent } from './bs-input.component';

describe('BsInputComponent', () => {
  let component: BsInputComponent;
  let fixture: ComponentFixture<BsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
