import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-asanam-video',
  templateUrl: './asanam-video.component.html',
  styleUrls: ['./asanam-video.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AsanamVideoComponent {
  videoUrl = input<string>('');

  constructor(private sanitizer: DomSanitizer) { }

  safeVideoUrl = computed(() => {
    const url = this.videoUrl();
    if (!url) return undefined;

    const videoId = this.extractVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1&controls=1&enablejsapi=1&origin=${window.location.origin}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  private extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

}