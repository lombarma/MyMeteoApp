import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityModalComponent } from './humidity-modal.component';

describe('HumidityModalComponent', () => {
  let component: HumidityModalComponent;
  let fixture: ComponentFixture<HumidityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumidityModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HumidityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
