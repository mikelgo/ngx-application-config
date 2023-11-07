import {InjectionToken, Provider} from "@angular/core";
import {makeFeature} from "./make-feature";
import {Observable} from "rxjs";

export type LoadFn =  <C>(...deps: Provider[]) =>  Observable<C>

export const NGX_APPLICATION_CONFIG_FROM_REMOTE_FEATURE = new InjectionToken<{
  fn: LoadFn,
  deps: any
}>('Path to config json')

// TODO Typing of deps
export function fromRemote<C>(loadFn: (...deps: any[]) => C, d?: Provider[]) {
  return makeFeature('FromRemote',
    [
      {
        provide: NGX_APPLICATION_CONFIG_FROM_REMOTE_FEATURE,
        useValue: {fn: loadFn, deps: d},
        deps: d ? d : []
      }
    ]
  )
}
