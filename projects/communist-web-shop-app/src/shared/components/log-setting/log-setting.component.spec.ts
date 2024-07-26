import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSettingComponent } from './log-setting.component';

describe('LogSettingComponent', () => {
  let component: LogSettingComponent;
  let fixture: ComponentFixture<LogSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
