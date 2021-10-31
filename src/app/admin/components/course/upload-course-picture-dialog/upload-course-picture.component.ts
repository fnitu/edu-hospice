import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {GLOBALS} from '../../../../shared/core/globals';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomTranslateService} from '../../../../shared/services/custom-translate/custom-translate.service';
import {UploadCoursePictureService} from './upload-course-picture.service';
import {GalleryLinkInterface} from '../../../../shared/components/gallery/gallery-link.interface';

import * as _ from 'lodash';

@Component({
  selector: 'app-upload-course-picture',
  templateUrl: './upload-course-picture.component.html',
  styleUrls: ['./upload-course-picture.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadCoursePictureComponent implements OnInit, AfterViewInit {

  @ViewChild('uploadComponent') uploadComponent;
  @ViewChild('gallery') gallery;

  @Input() courseId;

  public images = [];
  public uploadConfig = {};
  public fileUploaded = null;
  public imageLinks: GalleryLinkInterface[];
  private numberOfUploadedFiles = 0;

  constructor(private matSnackBar: MatSnackBar,
              private customTranslateService: CustomTranslateService,
              private uploadCoursePictureService: UploadCoursePictureService) {
  }

  ngOnInit(): void {

    this.getUploadConfig();
    this.getImages();
  }

  ngAfterViewInit() {
    this.initFileUploadEvents();
  }

  private initFileUploadEvents() {
    this.uploadComponent.$fileupload
      .on('fileuploaddone', (e, data: any) => this.fileUploadDoneCallbackHandler(e, data));

    // For single selection, after first upload the file upload is disabled
    // in this case all events from filesContainer are disabled,
    // but we want the event for the cancel button in order to abort the upload in progress
    $(this.uploadComponent.uploadedFilesContainer.nativeElement)
      .on('click', `.cancel`, (e) => this.fileUploadCancelHandler(e));
  }

  private getUploadConfig() {
    this.uploadConfig = {
      multiple: false,
      actions: {
        remove: {
          icon: 'delete_forever',
          tooltip: 'Sterge fisierul',
          handler: () => this.deleteFile()
        }
      },
      uploadConfig: {
        url: '',
        add: (e, data) => this.fileUploadAddHandler(e, data)
      }
    };
  }

  private getImages() {
    const url = './assets/json/courseImages.json';

    this.uploadCoursePictureService.getImages(url).subscribe((response) => {
      this.images = response.payload;

      this.imageLinks = _.map(response.payload, (item) => {
        return {
          'href': item.url,
          'thumbnail': item.url
        };
      });

      this.gallery.linksUpdated.emit(this.imageLinks);
    });
  }

  private deleteFile() {

    if (this.fileUploaded) {
      const resetUrl = '';

      this.uploadCoursePictureService.resetUploadedData(resetUrl, this.fileUploaded.name).subscribe(
        (result) => {
          if (result.success) {
            this.resetUpload();
          }
        }
      );
    } else {
      this.resetUpload();
    }
  }

  private resetUpload() {
    this.uploadComponent.emptyUploadedFilesContainer();

    this.numberOfUploadedFiles--;

    this.fileUploaded = null;

    this.uploadComponent.disableUpload(false);
  }

  private fileUploadAddHandler(e, data) {
    // originalFiles means the files selected for upload
    if (data.originalFiles.length === 1) {
      if (this.numberOfUploadedFiles < 1) {
        this.uploadComponent.disableUpload(true);

        this.numberOfUploadedFiles++;

        const originalAdd = ($ as any).blueimp.fileupload.prototype.options.add;

        originalAdd.call(this.uploadComponent.fileUpload.nativeElement, e, data);
      }

    } else {
      // in this case user has multiple files selected for upload
      const message = this.customTranslateService.getTranslation('upload.warning');

      // this is a warning message because error message does not disappear and can create confusion to the user
      this.matSnackBar.open(message, GLOBALS.NOTIFICATIONS.WARNING, {
        duration: GLOBALS.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
        verticalPosition: 'bottom',
      });
    }
  }

  private fileUploadDoneCallbackHandler(e, data) {
    this.fileUploaded = data.files[0];
  }

  private fileUploadCancelHandler(e) {
    this.numberOfUploadedFiles--;

    ($ as any).blueimp.fileupload.prototype._cancelHandler.call(this.uploadComponent.fileUpload.nativeElement, e);

    this.fileUploaded = null;
  }
}
