import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionDetailPage } from './transaction-detail.page';

describe('TransactionDetailPage', () => {
  let component: TransactionDetailPage;
  let fixture: ComponentFixture<TransactionDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
