import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailedReportPage } from './detailed-report.page';

describe('DetailedReportPage', () => {
  let component: DetailedReportPage;
  let fixture: ComponentFixture<DetailedReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
