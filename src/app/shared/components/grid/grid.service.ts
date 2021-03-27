import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private http: HttpClient) { }

  /**
   * Get grid data
   * @param url
   */
  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  getActions(url: string): Observable<any> {
    return this.http.get(url);
  }

  public mergeActionsConfig(actionsConfig, clientActionsConfig) {
    _.each(actionsConfig, (value, key) => {
      _.each(value, (actionConfig) => {
        const action = actionConfig.action;

        actionConfig = _.merge(actionConfig, clientActionsConfig[key][action]);
      });
    });

    return actionsConfig;
  }
}
