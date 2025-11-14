import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleDemoComponent } from './lifecycle-demo';

describe('LifecycleDemo', () => {
  let component: LifecycleDemoComponent;
  let fixture: ComponentFixture<LifecycleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifecycleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
