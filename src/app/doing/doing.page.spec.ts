import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoingPage } from './doing.page';

describe('DoingPage', () => {
  let component: DoingPage;
  let fixture: ComponentFixture<DoingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DoingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
