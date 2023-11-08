import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {provideApplicationConfig} from "../../../libs/ngx-application-config/src/lib/provide-application-config";
import {fromLocalJson} from "@angular-kit/ngx-application-config";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {providers: [
    provideApplicationConfig(
      fromLocalJson('assets/config.json')
    ),
    ]})
  .catch((err) => console.error(err));
