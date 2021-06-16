import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsModalFormComponent } from './operations-modal-form.component';

describe('OperationsModalFormComponent', () => {
  let component: OperationsModalFormComponent;
  let fixture: ComponentFixture<OperationsModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsModalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
