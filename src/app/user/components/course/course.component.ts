import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CourseService } from './course.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { CourseInterface, CourseTreeNodeInterface } from "./course.interface";
import * as _ from "lodash";
import { User } from "../../../shared/interfaces/user";
import { AuthService } from "../../../shared/services/authentication/auth.service";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CourseComponent implements OnInit {
    @ViewChild("tree") tree;
    public selectedCourse;

    public courseDetails: CourseInterface = <CourseInterface>{}

    public treeControl = new NestedTreeControl<CourseTreeNodeInterface>(node => node.children);
    public dataSource = new MatTreeNestedDataSource<CourseTreeNodeInterface>();

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private sanitizer: DomSanitizer,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.currentUserResponse.subscribe((data: User) => {
            this.getTreeData(data.id, this.route.snapshot.paramMap.get('courseId'));
        });
    }

    private getTreeData(userId, courseId) {
        this.courseService.getTreeJsonData(userId, courseId).subscribe(response => {
            this.courseDetails = response;

            const nodes = this.generateNodesModel(this.courseDetails.sectionSummary);

            this.dataSource.data = nodes;

            // https://stackoverflow.com/a/52899556
            this.tree.treeControl.dataNodes = nodes;

            this.tree.treeControl.expandAll();
        });
    }

    private generateNodesModel(nodes): any[] {
        let treeNodes: any[] = [];

        _.each(nodes, (value) => {
            treeNodes.push({
                id: value.id,
                name: value.name,
                children: this.getNodeChildren(value)
            });
        });

        return treeNodes;
    }

    private getNodeChildren(node): any[] {
        let children: any[] = [];

        _.each(node.contentSummary, (value) => {
            children.push({
                id: value.id,
                name: value.name,
                contentType: value.contentType,
                resourceSummary: value.resourceSummary,
                url: value.url
            });
        });

        return children;
    }

    displayUrl(course) {
        this.selectedCourse = course;

        this.selectedCourse.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(course.url);
    }

    hasChild = (_: number, node: CourseTreeNodeInterface) => !!node.children && node.children.length > 0;
}
            
            
            