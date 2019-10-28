import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzFormComponent } from './ez-form.component';

describe('EzFormComponent', () => {
  let component: EzFormComponent;
  let fixture: ComponentFixture<EzFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
