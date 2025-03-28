import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DplistComponent } from './dplist.component';

describe('DplistComponent', () => {
  let component: DplistComponent;
  let fixture: ComponentFixture<DplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DplistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
