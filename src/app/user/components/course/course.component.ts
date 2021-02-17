import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CourseService } from './course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../shared/interfaces/course';
import { CourseTudor } from '../../../shared/interfaces/courseTudor'
import { DomSanitizer } from '@angular/platform-browser';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree'




@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CourseComponent implements OnInit {
    // private courseId: string;
    public courseDetails: Course = <Course>{};
    private courseIdTudor: string;
    public courseStructure: CourseTudor = <CourseTudor>{};
    // treeControl = new NestedTreeControl<CourseTudor>(node => node.section);
    dataSource = new MatTreeNestedDataSource<CourseTudor>();
    
    TREE_DATA: CourseTudor[];

    constructor(private courseService: CourseService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
        this.dataSource.data = this.TREE_DATA
    }


    hasChild = (_: number, node: CourseTudor) => !!node.section && node.section.length > 0;

   

    ngOnInit(): void {
        // this.courseId = this.route.snapshot.paramMap.get('courseId');
        this.courseIdTudor = this.route.snapshot.paramMap.get('courseIdTudor')

        this.courseService.fetchCourseStructure(this.courseIdTudor).subscribe((response: CourseTudor) => {
            for (const section of response.section){
                section.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(section.url);
            for (const resourceTudor of section.resources){
                resourceTudor.safeUrl = this.sanitizer.bypassSecurityTrustUrl(resourceTudor.url)
            }
        }
        this.courseStructure = response;
        });

        // this.courseService.getCourseDetails(this.courseId).subscribe((response: Course) => {
        //     for (const chapter of response.chapters) {
        //         chapter.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(chapter.url);
        //         for (const resource of chapter.resources) {
        //             resource.safeUrl = this.sanitizer.bypassSecurityTrustUrl(resource.url);
        //         }
        //     }
        //     this.courseDetails = response;
        // });

    }
}


