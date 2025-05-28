import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDetailPage } from './account-detail.page';

describe('AccountDetailPage', () => {
  let component: AccountDetailPage;
  let fixture: ComponentFixture<AccountDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
