import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachResultCardComponent } from './search-result-card.component';

describe('SerachResultCardComponent', () => {
  let component: SerachResultCardComponent;
  let fixture: ComponentFixture<SerachResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerachResultCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerachResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
