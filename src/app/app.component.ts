import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './core/services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private database = inject(DatabaseService);

  constructor() {
    this.initApp()
  }

  async initApp() {
    SplashScreen.show()
    await this.database.initializePlugin()
    SplashScreen.hide();
  }
}
