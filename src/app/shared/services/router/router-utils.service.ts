import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterUtilsService {

  constructor(private router: Router,
              private location: Location) { }

  refreshRoute(mainRoute: string, fullCurrentRoute: string[], routeExtras?: NavigationExtras) {
    this.router.navigate([mainRoute], {skipLocationChange: true}).then(() => {
      this.router.navigate(fullCurrentRoute, routeExtras);
    });
  }

  updateRouteUrl(url: string, regex, replaceValue: string) {
    url = url.replace(regex, replaceValue);

    // https://stackoverflow.com/questions/35618463/change-route-params-without-reloading-in-angular-2
    this.location.go(url);
  }
}
