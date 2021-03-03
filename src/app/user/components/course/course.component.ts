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

    private readonly SECTION: string = "section";
    private readonly CONTENT: string = "content";

    public nodesMap = new Map();

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
            const key = `${this.SECTION}_${value.id}`;

            this.populateNodesMap(key, {
                name: value.name,
                parent: true
            });

            treeNodes.push({
                id: key,
                name: value.name,
                children: this.getNodeChildren(value)
            });
        });

        return treeNodes;
    }

    private getNodeChildren(node): any[] {
        let children: any[] = [];

        _.each(node.contentSummary, (value) => {
            const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(value.url);

            const key = `${this.SECTION}_${value.id}_${this.CONTENT}_${value.id}`;

            this.populateNodesMap(key, {
                name: value.name,
                parent: false,
                url: safeUrl
            });

            children.push({
                id: key,
                name: value.name,
                contentType: value.contentType,
                resourceSummary: value.resourceSummary,
                url: safeUrl
            });
        });

        return children;
    }

    openNode(node) {
        this.selectedCourse = node;

        this.inactivateChildrenNodes();

        this.nodesMap.get(node.id).active = true;
    }

    /**
     * Reset the active state of children nodes to have only one node active at a time
     * @private
     */
    private inactivateChildrenNodes() {
        for (let value of this.nodesMap.values()) {
            if (!value.parent) {
                value.active = false;
            }
        }
    }

    private populateNodesMap(key, value) {
        this.nodesMap.set(key, {
            active: false,
            ...value
        });
    }

    hasChild = (_: number, node: CourseTreeNodeInterface) => !!node.children && node.children.length > 0;
}
            
            
            