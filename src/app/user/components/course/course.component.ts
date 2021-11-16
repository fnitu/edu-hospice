import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CourseService } from './course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree'
import { CourseInterface, CourseTreeNodeInterface } from "./course.interface";
import * as _ from "lodash";
import { User } from "../../../shared/interfaces/user";
import { AuthService } from "../../../shared/services/authentication/auth.service";
import { ROUTES } from "../../../shared/core/routes";
import { Subscription } from "rxjs";

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

    private queryParamsSubscription = new Subscription();

    public disablePrevButton: boolean = false;
    public disableNextButton: boolean = false;

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private router: Router,
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

            const nodes = this.generateNodesModel(this.courseDetails.userSectionSummary);

            this.dataSource.data = nodes;

            // https://stackoverflow.com/a/52899556
            this.tree.treeControl.dataNodes = nodes;

            this.tree.treeControl.expandAll();

            this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
                // If the query params is defined, navigates directly to that node
                if (params.node) {
                    this.openNode(params.node);
                } else {
                    // Otherwise activate first uncompleted content
                    this.activateFirstUncompletedContent();
                }
            });

            this.queryParamsSubscription.unsubscribe();
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

        _.each(node.contentSummaryWithoutResources, (value) => {
            const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(value.url);

            const key = `${this.SECTION}_${node.id}_${this.CONTENT}_${value.id}`;

            this.populateNodesMap(key, {
                name: value.name,
                parent: false,
                url: safeUrl,
                active: false,
                resourceSummary: value.resourceSummary,
                enabled: value.enabled,
                isCompleted: !!value.completionDate
            });

            children.push({
                id: key,
                name: value.name,
                contentType: value.type,
                resourceSummary: value.resourceSummary,
                url: safeUrl,
                enabled: value.enabled,
                isCompleted: !!value.completionDate
            });
        });

        return children;
    }

    private activateFirstUncompletedContent() {
        for (let [key, value] of this.nodesMap) {
            if (!value.parent) {
                if (value.enabled && !value.isCompleted) {
                    this.openNode(key);

                    break;
                }
            }
        }
    }

    public openNode(nodeId) {
        const selectedNode = this.nodesMap.get(nodeId);

        if (selectedNode.enabled) {
            //TODO make request for the node

            this.changeRoute(nodeId);

            this.selectedNode = selectedNode;

            this.selectedNodeId = nodeId;

            this.inactivateChildrenNodes();

            this.nodesMap.get(nodeId).active = true;

            this.disableNavigationButtons();
        }
    }

    private changeRoute(nodeId) {
        this.router.navigate([ROUTES.USER.COURSE, this.route.snapshot.paramMap.get('courseId')], {
            relativeTo: this.route.parent,
            queryParams: {
                node: nodeId
            }
        });
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

    /**
     * Disable prev for first content and next for last content
     * @private
     */
    private disableNavigationButtons() {
        const selectedIndex = this.nodeIds.indexOf(this.selectedNodeId);

        const isFirst = selectedIndex === 1; // check if is equal with 1 and not with 0 because 0 is the index of the first section
        const isLast = selectedIndex === this.nodeIds.length - 1;

        if (isFirst) {
            this.disablePrevButton = true;
        }

        if (isLast) {
            this.disableNextButton = true;
        }

        if (!isFirst && !isLast) {
            this.disablePrevButton = false;
            this.disableNextButton = false;
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

    public finalizeContent() {
        // request to save the timestamp
        // navigate to the next course
        // increment progress bar
        console.log("finalize content");
        this.selectedNode.isCompleted = true;
    }
}
