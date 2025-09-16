import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatanjaliMaharishiStatueComponent } from './patanjali-maharishi-statue.component';

describe('PatanjaliMaharishiStatueComponent', () => {
  let component: PatanjaliMaharishiStatueComponent;
  let fixture: ComponentFixture<PatanjaliMaharishiStatueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatanjaliMaharishiStatueComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatanjaliMaharishiStatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
