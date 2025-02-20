import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledpaymentComponent } from './cancelledpayment.component';

describe('CancelledpaymentComponent', () => {
  let component: CancelledpaymentComponent;
  let fixture: ComponentFixture<CancelledpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
