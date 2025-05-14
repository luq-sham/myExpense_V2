import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetsPage } from './budgets.page';

describe('BudgetsPage', () => {
  let component: BudgetsPage;
  let fixture: ComponentFixture<BudgetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
