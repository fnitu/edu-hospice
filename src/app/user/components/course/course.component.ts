import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CourseService } from './course.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree'

interface CourseTreeNode {
    name: string;
    children?: CourseTreeNode[]
    
  }
  interface Course{
    'description': string;
    'hours': number;
    'id': number;
    'image': string;
    'name': string;
    'shortDescription': string;
    'startDate': string;
    'progress': number;
    'courseType': string;
  }

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    encapsulation: ViewEncapsulation.None
})


export class CourseComponent implements OnInit {
    noCourseUrl = false;
    public selectedCourse;
    public course;
    public courseId: string;
    public courseDetails: Course = <Course>{}
    public courseData;
    public courseTreeData: CourseTreeNode[] = [];
    public treeControl = new NestedTreeControl<CourseTreeNode>(node =>node.children);
    public dataSource = new MatTreeNestedDataSource<CourseTreeNode>();
    
    constructor( private courseService: CourseService, private route: ActivatedRoute, private sanitizer: DomSanitizer){}
    
    ngOnInit(){
        this.courseId = this.route.snapshot.paramMap.get('courseId');
        
        this.courseService.getTreeJsonData(this.courseId).subscribe( response => {
            this.courseData = response;
                this.courseData.sections.forEach(section => {
                    //create section contents

                    const contentNodeList = [];
                        section.contents.forEach(content => {
                        
                            const contentNode = {
                                id: content.id,
                                name: content.name,
                                url: content.url
                            };

                    contentNodeList.push(contentNode);
                    });
                
                    const sectionNode = {
                        name: section.name,
                        //    id: section.id
                        children: contentNodeList
                    };
                
                        this.courseTreeData.push(sectionNode);
                
                });
            this.dataSource.data = this.courseTreeData;
            
        });
        
        this.courseService.getTreeJsonData(this.courseId).subscribe(res => {
            this.courseDetails = res;
        });      
                    
    }
                
    displayUrl(course){

        this.selectedCourse = course;

            this.selectedCourse.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(course.url);

                if(course.url === '' || course.url === undefined){
                    this.noCourseUrl = true;
                } else{
                    this.noCourseUrl = false;
                }
                        
    }
                
        hasChild = (_: number, node: CourseTreeNode) => !!node.children && node.children.length > 0;
}
            
            
            