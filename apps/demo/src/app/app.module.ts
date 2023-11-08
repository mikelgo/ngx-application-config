import {inject, Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NGX_APPLICATION_CONFIG_INITIALIZER, fromLocalJson, fromRemote, provideApplicationConfig} from "@angular-kit/ngx-application-config";

@Injectable({providedIn: 'root'})
export class ConfigLoader{
  private http = inject(HttpClient)

  load(){
    return this.http.get<any>('assets/config.json')
  }
}

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    //A,
    provideApplicationConfig(
    // --> json klappt
    //fromLocalJson('assets/config.json')
    fromRemote((c: ConfigLoader) => c.load(), [ConfigLoader])
  )],
  bootstrap: [AppComponent],
})
export class AppModule {}
