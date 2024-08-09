import { ComponentFixture, TestBed } from '@angular/core/testing';

import { shoppingComponent } from './shopping.component';

describe('shoppingComponent', () => {
  let component: shoppingComponent;
  let fixture: ComponentFixture<shoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [shoppingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(shoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
