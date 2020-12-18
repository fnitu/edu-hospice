import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public courseHours = 50;
  public studentsNumber = 150;

  constructor( private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public openCardLink(linkTo: string) {
    if (linkTo === 'courses') {
      this.router.navigate(['course-list'], {relativeTo: this.route.parent} );
    } else if (linkTo === 'students') {
      this.router.navigate(['course-list'], {relativeTo: this.route.parent} );
    }
  }

}
