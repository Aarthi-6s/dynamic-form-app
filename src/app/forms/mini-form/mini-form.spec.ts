import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniForm } from './mini-form';

describe('MiniForm', () => {
  let component: MiniForm;
  let fixture: ComponentFixture<MiniForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
