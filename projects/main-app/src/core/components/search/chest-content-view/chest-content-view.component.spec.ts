import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChetContentViewComponent } from './chest-content-view.component';

describe('ChetContentViewComponent', () => {
  let component: ChetContentViewComponent;
  let fixture: ComponentFixture<ChetContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChetContentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChetContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
