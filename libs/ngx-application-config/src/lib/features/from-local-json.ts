import {makeFeature} from "./make-feature";
import {InjectionToken} from "@angular/core";

export const NGX_APPLICATION_CONFIG_FROM_JSON_FEATURE = new InjectionToken<string>('Path to config json')

export function fromLocalJson(jsonPath: string) {
  return makeFeature('FromJson', [{ provide: NGX_APPLICATION_CONFIG_FROM_JSON_FEATURE, useValue: jsonPath }])}
