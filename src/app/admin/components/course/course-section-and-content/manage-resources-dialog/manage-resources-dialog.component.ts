import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ManageResourcesDialogService } from './manage-resources-dialog.service';

@Component({
  selector: 'app-manage-resources-dialog',
  templateUrl: './manage-resources-dialog.component.html',
  styleUrls: ['manage-resources-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManageResourcesDialog implements OnInit {
  public title: string;
  public resources = [];

  @ViewChildren('resourcesContainer') resourcesContainer: QueryList<ElementRef>;

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Numele Resursei',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'url',
      type: 'input',
      templateOptions: {
        label: 'URL',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public content: any,
    private manageResourcesDialogService: ManageResourcesDialogService
  ) {}

  ngOnInit() {
    this.resources = this.content.resourceSummary;
  }

  ngAfterViewInit() {
    this.resourcesContainer.changes.subscribe(() => {
      if (this.resourcesContainer && this.resourcesContainer.last) {
        this.resourcesContainer.last.nativeElement.scrollIntoView();
      }
    });
  }

  onAddResource() {
    this.resources.push(this.form.value);
    this.manageResourcesDialogService
      .addAditionalResource(this.content.id, this.form.value)
      .subscribe((response) => console.log(response));

    this.form.reset(this.form);
  }

  onResourceDelete() {
    console.log('deleted');
  }

  onSave() {}
}
