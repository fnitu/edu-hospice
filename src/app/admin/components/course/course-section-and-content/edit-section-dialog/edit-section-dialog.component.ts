import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {GLOBALS} from '../../../../../shared/core/globals';
import {SnackBarComponent} from '../../../../../shared/components/snack-bar/snack-bar.component';
import {EditSectionDialogService} from './edit-section-dialog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlaceholderFormatService} from '../../../../../shared/services/format/placeholder-format.service';

@Component({
  selector: 'app-edit-section-dialog',
  templateUrl: './edit-section-dialog.component.html',
  styleUrls: ['./edit-section-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditSectionDialogComponent {
  form = new FormGroup({});
  model = {
    name: this.data.name,
    index: this.data.index,
    visibility: this.data.visible,
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Numele sectiunii',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'index',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Index',
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'visibility',
      type: 'toggle',
      templateOptions: {
        label: 'Vizibil',
      },
    },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private editSectionDialogService: EditSectionDialogService,
              private matSnackBar: MatSnackBar,
              private dialogRef: MatDialogRef<EditSectionDialogComponent>,
              private placeholderFormatService: PlaceholderFormatService,) {

  }

  saveHandler() {
    const url = this.placeholderFormatService.stringFormat(GLOBALS.DATA_URL.UPDATE_SECTION_NAME,
      {
        '{sectionId}': this.data.id,
      }
    );

    const data = {
      name: this.model.name,
      visible: this.model.visibility
    };

    this.editSectionDialogService.updateSection(url, data).subscribe((response) => {

      if (response.success) {
        this.data.name = this.model.name;
        this.data.visible = this.model.visibility;
      }

      this.matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'top',
        data: {
          content: response.message,
          type: GLOBALS.NOTIFICATIONS.INFO,
        },
      });

      this.dialogRef.close();
    });
  }
}
