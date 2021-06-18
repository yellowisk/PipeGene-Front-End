import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigProviderModalComponent } from './config-provider-modal.component';

describe('ConfigProviderModalComponent', () => {
  let component: ConfigProviderModalComponent;
  let fixture: ComponentFixture<ConfigProviderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigProviderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigProviderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
