import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderParametersFormComponent } from './provider-parameters-form.component';

describe('ProviderParametersFormComponent', () => {
  let component: ProviderParametersFormComponent;
  let fixture: ComponentFixture<ProviderParametersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderParametersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderParametersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
