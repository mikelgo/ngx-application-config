import { EnvironmentProviders, makeEnvironmentProviders, Provider } from "@angular/core";

export type FeatureKind = 'FromJson' | 'FromRemote';

export interface ProvideApplicationConfigFeature {
  kind: FeatureKind;
  providers: Provider[];
}

export function makeFeature(kind: FeatureKind, providers: Provider[]) {
  return {
    kind,
    providers
  };
}
