import { Injectable } from '@angular/core';
import * as _ from "lodash";
import tippy, { hideAll } from 'tippy.js';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  constructor() {
  }

  public init(target, options?) {

    const defaultOptions = {
      theme: 'light',
      arrow: false,
      placement: 'bottom-start',
      duration: [350, 0]
    };

    const tooltipOptions = _.merge(defaultOptions, options);

    return tippy(target, tooltipOptions);
  }

  /**
   * Hide all tippy instances
   */
  public hideAll() {
    hideAll();
  }
}
