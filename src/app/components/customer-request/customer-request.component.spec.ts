import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequestComponent } from './customer-request.component';

describe('CustomerRequestComponent', () => {
  let component: CustomerRequestComponent;
  let fixture: ComponentFixture<CustomerRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
