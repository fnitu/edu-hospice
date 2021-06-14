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
    public selectedNode;
    private selectedNodeId;

    private readonly SECTION: string = "section";
    private readonly CONTENT: string = "content";

    public nodesMap = new Map();
    private nodeIds = [];

    public courseDetails: CourseInterface = <CourseInterface>{};

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

            this.activateFirstLeaf();
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

            const key = `${this.SECTION}_${node.id}_${this.CONTENT}_${value.id}`;

            this.populateNodesMap(key, {
                name: value.name,
                parent: false,
                url: safeUrl,
                active: false,
                resourceSummary: value.resourceSummary
            });

            children.push({
                id: key,
                name: value.name,
                contentType: value.type,
                resourceSummary: value.resourceSummary,
                url: safeUrl
            });
        });

        return children;
    }

    private activateFirstLeaf() {
        for (let [key, value] of this.nodesMap) {
            if (!value.parent) {
                this.openNode(key);

                break;
            }
        }
    }

    public openNode(nodeId) {
        this.selectedNode = this.nodesMap.get(nodeId);

        this.selectedNodeId = nodeId;

        this.inactivateChildrenNodes();

        this.nodesMap.get(nodeId).active = true;
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
        this.nodesMap.set(key, value);

        this.nodeIds.push(key);
    }

    public navigateToNextNode(isForward) {
        const navigationIndex = isForward ? 1 : -1;

        // get the index of the current selected node
        let startIndex = this.nodeIds.indexOf(this.selectedNodeId);

        while (true) {
            // get the next node id
            const nodeId = this.nodeIds[startIndex + navigationIndex];

            // check if the node id still exists in array
            if (nodeId) {
                // get node in order to check if is parent or not
                const node = this.nodesMap.get(nodeId);

                // if is not parent, open node
                if (!node.parent) {
                    this.openNode(nodeId);

                    break;
                } else {
                    // otherwise expand parent node
                    const dataNode = _.find(this.treeControl.dataNodes, ['id', nodeId]);

                    this.treeControl.expand(dataNode);

                    // check the next position
                    startIndex = startIndex + navigationIndex;
                }
            } else {
                break;
            }
        }
    }

    public hasChild = (_: number, node: CourseTreeNodeInterface) => !!node.children && node.children.length > 0;
}
