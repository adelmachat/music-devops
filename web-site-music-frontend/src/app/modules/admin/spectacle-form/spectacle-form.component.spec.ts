import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleFormComponent } from './spectacle-form.component';

describe('SpectacleFormComponent', () => {
  let component: SpectacleFormComponent;
  let fixture: ComponentFixture<SpectacleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpectacleFormComponent]
    });
    fixture = TestBed.createComponent(SpectacleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
