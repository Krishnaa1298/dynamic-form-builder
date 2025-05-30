import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormComponent } from './render-form.component';

describe('RenderFormComponent', () => {
  let component: RenderFormComponent;
  let fixture: ComponentFixture<RenderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenderFormComponent]
    });
    fixture = TestBed.createComponent(RenderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
