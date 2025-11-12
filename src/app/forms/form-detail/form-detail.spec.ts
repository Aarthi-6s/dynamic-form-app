import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetail } from './form-detail';

describe('FormDetail', () => {
  let component: FormDetail;
  let fixture: ComponentFixture<FormDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
