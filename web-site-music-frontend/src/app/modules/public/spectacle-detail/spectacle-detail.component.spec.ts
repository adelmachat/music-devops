import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleDetailComponent } from './spectacle-detail.component';

describe('SpectacleDetailComponent', () => {
  let component: SpectacleDetailComponent;
  let fixture: ComponentFixture<SpectacleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpectacleDetailComponent]
    });
    fixture = TestBed.createComponent(SpectacleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
