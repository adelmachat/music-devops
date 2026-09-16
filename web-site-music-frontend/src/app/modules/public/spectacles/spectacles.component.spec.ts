import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectaclesComponent } from './spectacles.component';

describe('SpectaclesComponent', () => {
  let component: SpectaclesComponent;
  let fixture: ComponentFixture<SpectaclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpectaclesComponent]
    });
    fixture = TestBed.createComponent(SpectaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
