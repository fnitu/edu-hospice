import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from './home.service';
import { Course } from '../../../shared/interfaces/course';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    public courseList: Array<Course> = new Array<Course>();

    constructor(private homeService: HomeService) {
    }

    ngOnInit(): void {
        this.homeService.getCourses().subscribe((response: Array<Course>) => {
            this.courseList = response;
        });
    }

}
