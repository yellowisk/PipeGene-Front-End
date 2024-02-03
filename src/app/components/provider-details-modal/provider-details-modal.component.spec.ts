import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDetailsModalComponent } from './provider-details-modal.component';

describe('ProviderDetailsModalComponent', () => {
  let component: ProviderDetailsModalComponent;
  let fixture: ComponentFixture<ProviderDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
