import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavingsPage } from './savings.page';

describe('SavingsPage', () => {
  let component: SavingsPage;
  let fixture: ComponentFixture<SavingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
