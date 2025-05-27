import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetDetailPage } from './budget-detail.page';

describe('BudgetDetailPage', () => {
  let component: BudgetDetailPage;
  let fixture: ComponentFixture<BudgetDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
