import { APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders, Provider } from "@angular/core";
import {ApplicationConfig} from "./application-config.service";
import {ProvideApplicationConfigFeature} from "./features/make-feature";
import {HttpClient} from "@angular/common/http";
import {NGX_APPLICATION_CONFIG_FROM_JSON_FEATURE} from "./features/from-local-json";
import {defer, of, tap} from "rxjs";
import {NGX_APPLICATION_CONFIG_FROM_REMOTE_FEATURE} from "./features/from-remote";


function initializeNgxApplicationConfigFactory(
  http: HttpClient,
  appConfig: ApplicationConfig<any>
){
  const fromJson = inject(NGX_APPLICATION_CONFIG_FROM_JSON_FEATURE, {optional: true})
  const fromRemote = inject(NGX_APPLICATION_CONFIG_FROM_REMOTE_FEATURE, {optional: true})

  if (fromJson && fromRemote){
    throw new Error('You can only set either fromJson() or fromRemote()')
  }
  if(!fromJson && !fromRemote){
    throw new Error('You must set either fromJson() or fromRemote()')
  }
  if (fromJson){
    return () =>  http.get<any>(fromJson).pipe(
      tap(c => appConfig.setConfig(c))
    )
  }
  if (fromRemote){
    // @ts-ignore
    const all = fromRemote.deps.map(d => inject(d))
    return () => defer(() => fromRemote.fn(...all).pipe(
      tap(c => appConfig.setConfig(c))
    ))
  }

  return () => of()


}
export const NGX_APPLICATION_CONFIG_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: initializeNgxApplicationConfigFactory,
  deps: [HttpClient, ApplicationConfig],
  multi: true
}

export function injectApplicationConfig<C>(): C {
  return inject(ApplicationConfig<C>).getConfig()
}

export function provideApplicationConfig(
  ...features: ProvideApplicationConfigFeature[]
): EnvironmentProviders[]{
  return [
    makeEnvironmentProviders([
      NGX_APPLICATION_CONFIG_INITIALIZER,
      ApplicationConfig,
      ...features.map((f) => f.providers)
    ]),


  ]
}


