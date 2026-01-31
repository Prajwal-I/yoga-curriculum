import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsanamVideoComponent } from './asanam-video.component';

describe('AsanamVideoComponent', () => {
  let component: AsanamVideoComponent;
  let fixture: ComponentFixture<AsanamVideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), AsanamVideoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AsanamVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract video ID from standard YouTube URL', () => {
    component.videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    component.ngOnChanges();
    expect(component.safeVideoUrl?.toString()).toContain('embed/dQw4w9WgXcQ');
  });

  it('should extract video ID from short YouTube URL', () => {
    component.videoUrl = 'https://youtu.be/dQw4w9WgXcQ';
    component.ngOnChanges();
    expect(component.safeVideoUrl?.toString()).toContain('embed/dQw4w9WgXcQ');
  });

  it('should handle embed URL correctly', () => {
    component.videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    component.ngOnChanges();
    expect(component.safeVideoUrl?.toString()).toContain('embed/dQw4w9WgXcQ');
  });
});
