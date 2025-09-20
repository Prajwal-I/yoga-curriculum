import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsanasListDetailsPage } from './asanas-list-details.page';

describe('AsanasListDetailsPage', () => {
  let component: AsanasListDetailsPage;
  let fixture: ComponentFixture<AsanasListDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsanasListDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
