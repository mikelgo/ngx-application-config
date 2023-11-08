import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})
export class ApplicationConfig<C> {
  private  config: C | null = null;
  /**
   * TODO HOW TO HANDLE HTTP AS DEP
   */


  setConfig(c: C){
    this.config = c
  }

  getConfig(): C {
    // TODo
    return this.config as C ;
  }
}
