import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { chevronBackSharp, chevronForwardSharp, layersOutline, syncOutline, time, timeOutline } from 'ionicons/icons';

addIcons({
  time,
  timeOutline,
  syncOutline,
  layersOutline,
  chevronBackSharp,
  chevronForwardSharp,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
