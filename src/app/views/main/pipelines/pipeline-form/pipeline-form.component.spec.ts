import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineFormComponent } from './pipeline-form.component';

describe('PipelineFormComponent', () => {
  let component: PipelineFormComponent;
  let fixture: ComponentFixture<PipelineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
