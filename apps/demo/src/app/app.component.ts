import { Component } from '@angular/core';
import {fromLocalJson, injectApplicationConfig, provideApplicationConfig} from "@angular-kit/ngx-application-config";

@Component({
  selector: 'ngx-application-config-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
  /*  provideApplicationConfig(
      fromLocalJson('assets/config.json')
    )*/
  ]
})
export class AppComponent {
  title = 'demo';
  config = injectApplicationConfig()


  constructor() {
    console.log('APP ', this.config)
  }
}
