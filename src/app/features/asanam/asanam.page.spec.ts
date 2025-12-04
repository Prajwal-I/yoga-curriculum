import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsanamPage } from './asanam.page';

describe('AsanamPage', () => {
  let component: AsanamPage;
  let fixture: ComponentFixture<AsanamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsanamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
