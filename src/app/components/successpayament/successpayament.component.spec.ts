import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesspayamentComponent } from './successpayament.component';

describe('SuccesspayamentComponent', () => {
  let component: SuccesspayamentComponent;
  let fixture: ComponentFixture<SuccesspayamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesspayamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesspayamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
