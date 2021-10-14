import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import { CustomTranslateService } from '../../services/custom-translate/custom-translate.service';
import { UploadService } from './upload.service';

import * as _moment from 'moment';
import * as momentJDate from 'moment-jdateformatparser';
import * as _ from 'lodash';

const moment = _.merge(_moment, momentJDate);

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UploadComponent implements OnInit, OnDestroy {

  constructor(private customTranslateService: CustomTranslateService,
              private uploadService: UploadService,
              private authService: AuthService) {
  }
  @ViewChild('fileUpload', {static: true}) fileUpload: ElementRef;
  @ViewChild('uploadedFilesContainer', {static: true}) uploadedFilesContainer: ElementRef;

  @Input() config;

  public componentId;

  private $fileupload;

  private static fileUploadSubmitHandler(e, data) {
    // set the file name as form data parameter
    data.paramName = data.files[0].name;

    return true;
  }

  ngOnInit(): void {
    // generate an unique ID for each component
    this.componentId = moment().unix();

    this.initUploadPlugin();
  }

  ngOnDestroy(): void {
    this.destroyFileUploadEvents();
  }

  private initUploadPlugin() {
    const defaultConfig: any = this.getDefaultFileUploadConfig();

    _.merge(defaultConfig, this.config.uploadConfig);

    this.$fileupload = $(this.fileUpload.nativeElement);
    (this.$fileupload as any).fileupload(defaultConfig);

    this.initFileUploadEvents();
  }

  private getDefaultFileUploadConfig() {
    return {
      dropZone: this.$fileupload,
      dataType: 'json',
      headers: {
        // 'X-CSRF-TOKEN': this.authService.accessToken
      },
      autoUpload: true,
      filesContainer: $(this.uploadedFilesContainer.nativeElement),
      uploadTemplateId: null,
      downloadTemplateId: null,
      uploadTemplate: (o) => this.uploadTemplate(o),
      downloadTemplate: (o) => this.downloadTemplate(o),
      getFilesFromResponse: (data) => {
        return [data.result]; // the response must be an array [check line 180 in jquery.fileupload-ui.js]
      }
    };
  }

  private uploadTemplate(o) {
    let rows = $();

    _.each(o.files, (file) => {

      const fileGroup = this.uploadService.getGroupFile(file.type);

      const cancelTooltip = this.customTranslateService.getTranslation('general.cancel');

      const row = $(`<li class="template-upload fade">
                                <div class="documentIcon ${fileGroup}"></div>
                                <div class="file">
                                    <div class="fileName">${file.name}</div>
                                    <div class="fileProgress">
                                      <div class="fileProgressBar"></div>
                                    </div>
                                </div>
                                <div class="cancel" title="${cancelTooltip}"></div>
                            </li>`);

      rows = rows.add(row);
    });

    return rows;
  }

  private downloadTemplate(o) {
    let rows = $();

    _.each(o.files, (file) => {
      const fileGroup = this.uploadService.getGroupFile(file.mimeType);
      let errorClass = '';
      let fileName = '';

      if (!file.error) {
        fileName = file.name;
      } else {
        errorClass = 'errorFile';
        // for the files with errors the filename is replaced with the error that contains filename, as well
        fileName = file.errorMessage;
      }

      const row = $(`<li class="template-download fade">
                                <div class="documentIcon ${fileGroup}"></div>
                                <div class="file ${errorClass}">
                                    <div class="fileName">${fileName}</div>
                                    <div class="fileProgress"></div>
                                </div>
                                ${this.generateUploadActionsMarkup()}
                            </li>`);

      row.data('file', file);

      rows = rows.add(row);
    });

    return rows;
  }

  private initFileUploadEvents() {
    this.$fileupload
      .on('fileuploadsubmit', (e, data: any) => UploadComponent.fileUploadSubmitHandler(e, data))
      .on('fileuploaddrop', this.removeDagOverClass)
      .on('fileuploaddragover', this.addDragOverClass)
      .on('dragleave', this.removeDagOverClass)
      .on('fileuploadprogress', (e, data: any) => this.fileUploadProgressHandler(e, data))
      .on('fileuploadfail', (e, data: any) => this.fileUploadFailHandler(e, data));

    this.generateUploadActionsHandler();
  }

  private generateUploadActionsHandler() {
    _.each(this.config.actions, (value, key) => {
      $(this.uploadedFilesContainer.nativeElement).on('click', `.${key}`, value.handler);
    });
  }

  private generateUploadActionsMarkup() {
    let template = ``;

    _.each(this.config.actions, (value, key) => {
      template += `<span class="material-icons-outlined ${key}" title="${value.tooltip}">${value.icon}</span>`;
    });

    return template;
  }

  private addDragOverClass() {
    $(this).addClass('dragOver');
  }

  private removeDagOverClass() {
    $(this).removeClass('dragOver');
  }

  private fileUploadProgressHandler(e, data: any) {
    const progress = parseInt((data.loaded / data.total * 100).toString(), 10);
    const $progressBar = data.context.find('.fileProgressBar');

    $progressBar.css(
      'width',
      progress + '%'
    );
  }

  private fileUploadFailHandler(e, data) {
    for (let i = 0; i < data.files.length; i++) {
      if (data.jqXHR.responseJSON) {
        data.files[i].errorMessage = data.jqXHR.responseJSON.message
      } else {
        // case to display errors like 404, 405 when server doesn't throw error messages in responseJSON
        if (data.jqXHR.status !== 0) {
          data.files[i].errorMessage = data.jqXHR.status + ' ' + data.jqXHR.statusText;
        } else {
          // enable plugin when upload is aborted
          this.disableUpload(false);
        }
      }
    }
  }

  public emptyUploadedFilesContainer() {
    $(this.uploadedFilesContainer.nativeElement).empty();
  }

  private destroyFileUploadEvents() {
    this.$fileupload
      .off('fileuploadsubmit', UploadComponent.fileUploadSubmitHandler)
      .off('fileuploadprogress', this.fileUploadProgressHandler)
      .off('fileuploadfail', this.fileUploadFailHandler);
  }

  public disableUpload(disable) {
    disable ? this.$fileupload.fileupload('disable') : this.$fileupload.fileupload('enable');
  }
}
