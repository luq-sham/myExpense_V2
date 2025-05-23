import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessagePage } from './error-message.page';

describe('ErrorMessagePage', () => {
  let component: ErrorMessagePage;
  let fixture: ComponentFixture<ErrorMessagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
